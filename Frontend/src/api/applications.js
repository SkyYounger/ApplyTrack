const API_URL = "http://127.0.0.1:8000"

function handleResponse(response) {
    if(!response.ok) {
        throw new Error(`Request failed with status ${response.status}`)
    }

    return response.json()
}

export function getApplications() {
    return fetch (`${API_URL}/applications`).then(handleResponse)
}

export function getApplication(id) {
    return fetch (`${API_URL}/applications/${id}`).then(handleResponse)
}

export function createApplication(application) {
    return fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(application),
    }).then(handleResponse)
}

export function updateApplication(id, application) {
    return fetch(`${API_URL}/applications/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(application),
    }).then(handleResponse)
}

export function deleteApplication(id) {
    return fetch(`${API_URL}/applications/${id}`, {
        method: "DELETE",
    })
}