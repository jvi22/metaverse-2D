const axios = require('axios');

function sum(a, b) {
    return a - b
}


const BACKEND_URL = "http://localhost:3000"

//describe blocks ( to test all the Authentication Endpoints )

describe("Authentication", () => {
    
    //defining username & password
    test("User is able to sign up", async() => {
        const username = "jaanvi" + Math.random();
        const password = "123456";

       //send the request to signup 
       const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        expect(response.statusCode).toBe(200)
        const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password,
            type: "admin"
        })

        expect(updatedResponse.statusCode).toBe(400);
    });

    test('Signup request fails if the username is empty', async() => {
        const username = `jaanvi-${Math.random()}`;
        const password = "123456";

        const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            password
    })

    expect(response.statusCode).toBe(400)

    });

    test('Signin succeeds if the username and password are correct', async() => {
        const username = `jaanvi-${Math.random()}` 
        const password = "123456"

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password
        });

        await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password
        });  

        expect(response.statusCode).toBe(200)
        expect(response.data.token).toBeDefined()

    });
    
    test('Signin fails if wrong credentials', async() => {
        const username = `jaanvi-${Math.random()}`;
        const password = "123456";

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
            username,
            password
        });
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, { 
            username : `janvi-${Math.random()}`,
            password
        })
       // 403- unauthorized(wrong credentials)
    expect(response.statusCode).toBe(403);
    });
})

describe("User Information Endpoints", () => {

    let token = "";
    let avatarID = "";

    //user has to be signed in before accessing or updating the avatars etc.
    beforeAll( async () => {
        const username = `jaanvi- ${Math.random()}`;
        const password = "123456";

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
        type : "admin"
        })
        
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password
        })

        token = response.data.token

    })

    test("User can't update their metadata with a wrong avatar ID", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarID: "12341234"
        }, {
            headers: {
                 "authorization" : `Bearer ${token}`
            }
        })

        expect(response.statusCode).toBe(400);
    });

    test("User can update their metadata with the right avatar ID",async () => {

        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarID
        }, {
            headers: {
                 "authorization" : `Bearer ${token}`
            }
        })

        expect(response.statusCode).toBe(200);
    });

    test("User can't update their metadata if the auth header is missing", async () => {
        const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
            avatarID
        })

        expect(response.statusCode).toBe(403);
    })

})

describe("User Metadata Informaton", () => {
    let avatarID;
    let token;
    let userID;

    //user has to be signed in before accessing or updating the avatars etc.
    beforeAll( async () => {
        const username = `jaanvi- ${Math.random()}`;
        const password = "123456";

        await axios.post(`${BACKEND_URL}/api/v1/signup`, {
        username,
        password,
        type : "admin"
        })
        
        userID = signupResponse.data.userID
        
        console.log("userid is " + userId)
        const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
        username,
        password
        })

        token = response.data.token

        const avatarResponse = await axios.post(`${BACKEND_URL}/api/v1/admin/avatar`, {
             "imageUrl": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
             "name": "Timmy"
         }, {
            headers: {
                authorization: `Bearer ${token}`
            }
         })
 
         avatarID = avatarResponse.data.avatarID;

    })

    test('')
})
