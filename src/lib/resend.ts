import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY || 're_Y6gWENxV_EoSQ3ErTiGAbhe5htT7TT2YG')

export { resend }

