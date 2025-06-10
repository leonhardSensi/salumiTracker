// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import { TransportOptions } from "nodemailer";
import pug from "pug";
import { convert } from "html-to-text";
require("dotenv").config({ path: "../../.env" });

const smtp = {
  host: process.env.SMTP_HOST as string,
  port: Number(process.env.SMTP_PORT),
  user: process.env.SMTP_USER as string,
  pass: process.env.SMTP_PASSWORD as string,
};

interface ISalumeToNotify {
  salume: string;
  daysRemaining: number;
}

interface IUser {
  email: string;
  name: string;
}

export default class Email {
  firstName: string;
  to: string;
  from: string;
  salumiToNotifyArr: ISalumeToNotify[];

  constructor(
    public user: IUser,
    public url: string,
    salumiToNotifyArr: ISalumeToNotify[] = []
  ) {
    this.firstName = user.name.split(" ")[0];
    this.salumiToNotifyArr = salumiToNotifyArr;
    this.to = user.email;
    this.from = "info@salumitracker.com";
  }

  private newTransport() {
    return nodemailer.createTransport({
      ...smtp,
      auth: {
        user: smtp.user,
        pass: smtp.pass,
      },
    } as TransportOptions);
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      salumiToNotifyArr: this.salumiToNotifyArr,
      subject,
      url: this.url,
    });
    // Create mailOptions
    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      text: convert(html),
      html:
        html +
        '<img src="cid:salumeImg" style="width: 16rem"; height: "height: 16rem";/>',
      attachments: [
        {
          filename: "salume-1hn3fq3sbiqtgcm7pq1o-1708440489867.png",
          path: "/Users/frank/projects/salumiTracker/backend/public/salumePictures/salume-1hn3fq3sbiqtgcm7pq1o-1708440489867.png",
          cid: "salumeImg",
        },
      ],
    };
    // // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(info);
    console.log("Email sent successfully");
  }

  async sendVerificationCode() {
    await this.send("verificationCode", "Your account verification code");
  }

  async salumeReminder() {
    if (this.salumiToNotifyArr.length > 1) {
      await this.send("salumeReminder", `Your salumi are almost ready!`);
    } else {
      await this.send("salumeReminder", `Your  are almost ready!`);
    }
  }

  async sendPasswordResetToken() {
    await this.send(
      "resetPassword",
      "Your password reset token (valid for only 10 minutes)"
    );
  }
}
