import { VercelRequest, VercelResponse } from "@vercel/node"

export default function handler(req: VercelRequest, res: VercelResponse): void {
  const date = new Date().toString()
  const { body, query, cookies } = req
  res.status(200).json({
    body,
    query,
    cookies,
    date
  })
}
