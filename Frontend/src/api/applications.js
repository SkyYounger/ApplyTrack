const API_URL = "http://127.0.0.1:8000"

export function getApplications() {
    return fetch (`${API_URL}/applications`).then ((response) => response.json())
}

export function createApplication(application) {
    return fetch(`${API_URL}/applications`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(application),
    }).then((response) => response.json())
}

export function updateApplication(id, application) {
    return fetch(`${API_URL}/applications/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify(application),
    }).then((response) => response.json())
}

export function deleteApplication(id) {
    return fetch(`${API_URL}/applications/${id}`, {
        method: "DELETE",
    })
}