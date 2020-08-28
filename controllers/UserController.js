const { User, Task } = require('../models')
const { generateToken } = require('../helpers/jwt')
const { comparer } = require('../helpers/bcrypt')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.CLIENT_ID)
const nodemailer = require('nodemailer')


class UserController {
    static async register(req, res, next) {
        try {
            let { name, email, password } = req.body
            let newUser = {
                name,
                email,
                password
            }
            let user = await User.create(newUser)
            let token = generateToken({ id: user.id, email: user.email }, process.env.JWT_SECRET)
            res.status(201).json(token)
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            let { email, password } = req.body
            let user = await User.findOne({ where: { email } })
            let valid = await comparer(password, user.password)
            if (user) {
                if (valid) {
                    let token = generateToken({ id: user.id, email: user.email }, process.env.JWT_SECRET)
                    res.status(200).json(token)
                } else {
                    next(
                        {
                            status: 400,
                            message: "Wrong Email/Password"
                        }
                    )
                }
            } else {
                next({
                    status: 400,
                    message: "Wrong Email/Password"
                })
            }
        } catch (error) {
            next(error)
        }
    }

    static async glogin(req, res, next) {
        try {
            let { token } = req.body
            console.log(token,'adsfafasd')
            let ticket = await client.verifyIdToken({ idToken: token, audience: process.env.CLIENT_ID })
            let newUser = ticket.getPayload()
            let existedUser = await User.findOne({ where: { email: payload.email } })
            let user
            if (!existedUser) {
                let randomstring = Math.random().toString(36).slice(-8);
                let newUser = {
                    name: payload.given_name + ' ' + payload.family_name,
                    email: payload.email,
                    password: randomstring
                }
                console.log(newUser,'adsfafasd')
                UserController.sendEmail(newUser.email, newUser.password)
                user = await User.create(newUser)
            } else {
                user = existedUser
            }
            let id = user.id
            let email = user.email
            let googleToken = generateToken({ id, email }, process.env.JWT_SECRET)
            res.status(200).json(googleToken)
        } catch (error) {
            next(error)
        }
    }

    static sendEmail(email, name) {
        console.log(email, name, 'ini node')
        const password = name
        //step 1
        //call transporter and authenticator
        let transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_SEND,
                pass: process.env.PASSWORD_SEND

                // user: 'pancakebantet@gmail.com',
                // pass: 'coba@7890'
                //silahkan diisi, ini bisa diisi langung, bisa juga diisi dengan dotenv:
                //kalo gamau langsung coba liat dokumentasi dotenv
                //call with process.env.
                //.env di ignore
                //di dalem .env isi :
                //PASSWORD:
                //EMAIL:
                //referensi: https://www.youtube.com/watch?v=Va9UKGs1bwI&t

            }
        })
        //step 2 define delivery path
        let mailOptions = {
            from: '',
            //jangan lupa diisi from-nya
            to: `${email}`,
            subject: 'Thank You!',
            // text: `Halo ToSeMol's family! Terimakasih ya ${name} telah berbelanja di website kami. Pesanan anda akan kami proses dan kirim segera!`
            text: `Thank you for registering on our website. this is your password "${password}", please change it or you can use it`

        }
        //IMPORTANT!
        //Before sending, check you email provider regarding the authority for nodemailer use
        //for an example, you must turn on this feature if you use gmail: https://myaccount.google.com/lesssecureapps

        //Step 3 (Time to send it!)

        transporter.sendMail(mailOptions, (err, data) => {
            if (err) {
                console.log(err)
            } else {
                console.log('hooray! email is sent!')
            }
        })
    }
}

module.exports = UserController