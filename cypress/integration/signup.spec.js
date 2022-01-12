import signupPage from '../pages/SignupPage'
import signupFactory from '../factories/SignupFactory'


describe('Signup', () => {

    // beforeEach(function() {
    //    cy.fixture('deliver').then((d)=>{
    //       this.deliver = d
    // })
    //})

    it('User should be deliver', function () {

        var deliver = signupFactory.deliver()

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()

        //objeto imutável
        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        signupPage.modalContentShouldBe(expectedMessage)
    })

    it('Invalid document', function () {
        var deliver = signupFactory.deliver()
        deliver.cpf = 'x00eed00141AA'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertModalShouldbe('Oops! CPF inválido')
    })

    it('Invalid email', function () {
        var deliver = signupFactory.deliver()
        deliver.email = 'user.com.br'

        signupPage.go()
        signupPage.fillForm(deliver)
        signupPage.submit()
        signupPage.alertModalShouldbe('Oops! Email com formato inválido.')
    })

    context('Required fields', function () {

        before(function () {
            signupPage.go()
            signupPage.submit()
        })

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        messages.forEach(function (msg) {
            it(`${msg.field} is required`, function () {
                signupPage.alertModalShouldbe(msg.output)
            })
        })

    })

})