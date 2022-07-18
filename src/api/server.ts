let token = '700695cfa75ef5f9823fdd4f2a7ef01439b5dc07be74a811'

export const serverCalls = {

    get: async() => {
        const response = await fetch(`https://rangers-marvel-site.herokuapp.com/api/chars`,{
            method: `GET`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
        if (!response.ok){
            throw new Error('Failed to fetch data from server')
        }


        return await response.json()
    },
    /** IMPORTANT TO NOTE: CODE DOES NOT WORK AT FOLLOWING FETCH LINE
     * 
     *  The fetch request in the following create server call results in an an internal server error.
     *  The surrounding server calls work fine, but this one in particular continuously runs into this same error.
     *  I've spent many hours on trying to resolve this issue, but to no avail.
     *  If you can figure out what part of this is screwing up despite the same address working in Insomnia,
     *  I would greatly appreciate it if you could message me with what the problem is.
     */


    create: async(data:any = {}) => {
        const response = await fetch(`https://rangers-marvel-site.herokuapp.com/api/chars`,{
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        if (!response.ok){
            throw new Error('Failed to create data on server ')
        }


        return await response.json()
    },
    update: async(id:string, data:{}) => {
        const response = await fetch(`https://rangers-marvel-site.herokuapp.com/api/chars/${id}`,{
            method: `POST`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
        if (!response.ok){
            throw new Error('Failed to update data from server')
        }


        return await response.json()
    },
    delete: async(id:string) => {
        const response = await fetch(`https://rangers-marvel-site.herokuapp.com/api/chars/${id}`,{
            method: `DELETE`,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': `Bearer ${token}`
            }
        })
        if (!response.ok){
            throw new Error('Failed to delete data from server')
        }


        return await response.json()
    }
}