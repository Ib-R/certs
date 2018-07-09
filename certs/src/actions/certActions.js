export function addCert(cert) {
    return {
        type: 'ADD',
        payload: cert
    }
}

export function showCerts() {
    return dispatch => {
        fetch('http://localhost/certs/backend/api/cert/show')
        .then(res => res.json())
        .then(content => {
            dispatch({
                type: 'SHOW_CERTS',
                payload: content.data
            })
        })
    }
}

export function editCert(val) {
    return {
        type: 'EDIT',
        payload: val
    }
}