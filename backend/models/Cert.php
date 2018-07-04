<?php 
  class Cert {
    // DB stuff
    private $conn;
    private $table = 'certs';

    // Post Properties
    public $id;
    public $name;
    public $title;
    public $date;

    // Constructor with DB
    public function __construct($db) {
      $this->conn = $db;
    }

    // Get Certs
    public function read() {
      $certName = 'name';
      $certSerial = 'serial';
      $certDate = 'date';
      // Create query
      $query = 'SELECT 
            id,
            title,
            '.$certSerial.',
            '.$certDate.',
            '.$certName.',
            img
          FROM
            ' . $this->table ;
      
      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Execute query
      $stmt->execute();

      return $stmt;
    }

    // Get Single Post
    public function read_single() {
       // Create query
       $query = 'SELECT 
       p.id,
       p.name,
       p.title,
       p.date,
       p.serial,
       p.img
      FROM
        ' . $this->table . ' p
      WHERE
        p.serial = ?
      LIMIT 0,1';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Bind ID
      $stmt->bindParam(1, $this->serial);

      // Execute query
      $stmt->execute();

      $row = $stmt->fetch(PDO::FETCH_ASSOC);

      // Set properties
      $this->id = $row['id'];
      $this->title = $row['title'];
      $this->name = $row['name'];
      $this->serial = $row['serial'];
      $this->date = $row['date'];
      $this->img = $row['img'];
    }

    // Create Post
    public function create() {
      // Create query
      $query = 'INSERT INTO ' . 
          $this->table . '
        SET
          title = :title,
          name = :name,
          serial = :serial,
          date = :date,
          img = :img';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Clean data
      $this->title = htmlspecialchars(strip_tags($this->title));
      $this->name = htmlspecialchars(strip_tags($this->name));
      $this->serial = htmlspecialchars(strip_tags($this->serial));
      $this->date = htmlspecialchars(strip_tags($this->date));

      // Bind data
      $stmt->bindParam(':title', $this->title);
      $stmt->bindParam(':serial', $this->serial);
      $stmt->bindParam(':name', $this->name);
      $stmt->bindParam(':date', $this->date);
      $stmt->bindParam(':img',$this->img);

      // Execute query
      if($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    // Update Post
    public function update() {
      // Check for image change
      $img ='';
      if($this->img != ''){
        $img = ',img = :img';
      }
      // Create query
      $query = 'UPDATE ' . 
          $this->table . '
        SET
          title = :title,
          name = :name,
          date = :date,
          serial = :serial'
          .$img.'
        WHERE
          id = :id';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Clean data
      $this->title = htmlspecialchars(strip_tags($this->title));
      $this->name = htmlspecialchars(strip_tags($this->name));
      $this->date = htmlspecialchars(strip_tags($this->date));
      $this->serial = htmlspecialchars(strip_tags($this->serial));
      $this->id = htmlspecialchars(strip_tags($this->id));

      // Bind data
      $stmt->bindParam(':title', $this->title);
      $stmt->bindParam(':name', $this->name);
      $stmt->bindParam(':date', $this->date);
      $stmt->bindParam(':serial', $this->serial);
      $stmt->bindParam(':id', $this->id);
      if($this->img != ''){ // check for image change
        $stmt->bindParam(':img', $this->img);
      }

      // Execute query
      if($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }

    // Delete Post
    public function delete() {
      // Create query
      $query = 'DELETE FROM ' . $this->table . ' WHERE id = :id';

      // Prepare statement
      $stmt = $this->conn->prepare($query);

      // Clean data
      $this->id = htmlspecialchars(strip_tags($this->id));

      // Bind data
      $stmt->bindParam(':id', $this->id);

      // Execute query
      if($stmt->execute()) {
        return true;
      }

      // Print error if something goes wrong
      printf("Error: %s.\n", $stmt->error);

      return false;
    }
    
  }