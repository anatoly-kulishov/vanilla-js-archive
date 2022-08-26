export const checkResponseStatus = (status) => {
    if (status) {
        switch (status) {
            case 200: {
                return 'success'
            }
            case 400: {
                return 'warning'
            }
            default: {
                return 'danger'
            }
        }
    }
    return null
}

export const isAdmin = (role) => {
    return role === 'admin';
}