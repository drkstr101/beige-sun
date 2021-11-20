import sgMail from "@sendgrid/mail"
import { VercelRequest, VercelResponse } from "@vercel/node"
import { get } from "lodash"

export default function contact(req: VercelRequest, res: VercelResponse): void {
  const { body } = req
  sgMail.setApiKey(process.env.SENDGRID_API_KEY)
  const msg = {
    to: "admin@watheia.org",
    from: "admin@watheia.org",
    subject: `Contact from ${get(body, "name")}`,
    text: get(body, "message")
  }
  sgMail
    .send(msg)
    .then(() => {
      console.log("Email sent", body)
    })
    .catch((error) => {
      console.error(error)
    })

  res.status(200).json({
    message: "Thank you, we will be in touch shortly!"
  })
}
