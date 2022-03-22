describe("Api V1 ETE", () => {
    it("Users can be created", () =>{
        
        let userdata = { 
            "username":"CypressUser",
            "password":"cypresspass", 
            "email": "cypressuser@mailinator.com"
       }

        cy.request({
            method:"POST", 
            url:"/api/v1/register",
            json: true,
            body: userdata})
            .then((response) => {
                expect(response.status).to.eq(201)
                expect(response.body).to.have.property('id')
                expect(response.body).to.have.property('email', userdata.email)
                expect(response.body).to.have.property('username', userdata.username)

                //save data for next tests
                cy.task('setUserData', response.body)
            })
    })

    it("Users can be searched", () => {
        cy.task('getUserData').then((data) => {

            cy.request({
                method:"GET", 
                url:"/api/v1/users?id=" + data.id
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property('email', data.email)
                    expect(response.body).to.have.property('username', data.username)
                })
        })
    })

    it("Tasks can be created", () => {
        cy.task('getUserData').then((data) => {

            let taskdata = { 
                "user_id": data.id,
                "task_name":"Task created with Cypress", 
                "task_desc": "Cypress rocks!"
           }

            cy.request({
                method:"POST", 
                url:"/api/v1/tasks",
                json: true,
                body: taskdata})
                .then((response) => {
                    expect(response.status).to.eq(201)
                    expect(response.body).to.have.property("task_id")
                    expect(response.body).to.have.property('task_name', taskdata.task_name)
                    expect(response.body).to.have.property('task_desc', taskdata.task_desc)

                    //save data for next test
                    cy.task('settaskData', response.body)
                })
        })
    })

    it("Tasks can be searched", () =>{
        cy.task('getUserData').then((data) => {
            cy.request({
                method:"GET", 
                url:"/api/v1/tasks?user_id=" +data.id
            })
                .then((response) => {
                    cy.task('gettaskData').then((taskdata) =>{
                        expect(response.status).to.eq(200)
                        expect(response.body[0]).to.have.property("task_id", taskdata.task_id)
                        expect(response.body[0]).to.have.property('task_name', taskdata.task_name)
                        expect(response.body[0]).to.have.property('task_desc', taskdata.task_desc)
                    })
                })
        })
    })

    it("Tasks can be updated", () => {
        cy.task('gettaskData').then((data) => {

            let taskdata = {
                "task_id": data.task_id,
                "task_name": "Updated from Cypress",
                "task_desc": "Cypress still rocks!"
            }

            cy.request({
                method:"PUT", 
                url:"/api/v1/tasks",
                json: true,
                body: taskdata})
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.property("task_id")
                    expect(response.body).to.have.property('task_name', taskdata.task_name)
                    expect(response.body).to.have.property('task_desc', taskdata.task_desc)
                })
        })
    })

    it("Tasks can be deleted", () => {
        cy.task('gettaskData').then((data) => {
            cy.request({
                method:"DELETE", 
                url:"/api/v1/tasks?task_id=" + data.task_id
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.include("Task deleted succesfully!")
                })
        })
    })

    it("User can be deleted", () => {
        cy.task('getUserData').then((data) => {

            cy.request({
                method:"DELETE", 
                url:"/api/v1/users?user_id=" + data.id
            })
                .then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body).to.have.include('User deleted sucessfully!')
                })
        })
    })


})