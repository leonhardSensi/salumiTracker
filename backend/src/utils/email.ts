// const nodemailer = require("nodemailer");
import nodemailer from "nodemailer";
import { createTransport, TransportOptions } from "nodemailer";
import { User } from "../entities/user.entity";
import pug from "pug";
import { convert } from "html-to-text";
import { string } from "zod";
import SMTPTransport from "nodemailer/lib/smtp-transport";
require("dotenv").config({ path: "../../.env" });

// const smtp = config.get<{
//   host: string;
//   port: number;
//   user: string;
//   pass: string;
// }>("smtp");

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
  // salume: string;
  // totalSalumi: string;
  // daysRemaining: string;
  salumiToNotifyArr: ISalumeToNotify[];

  constructor(
    public user: IUser,
    public url: string,
    salumiToNotifyArr: ISalumeToNotify[] = []
  ) {
    this.firstName = user.name.split(" ")[0];
    // this.salume = salumeInfo.salume;
    // this.totalSalumi = salumeInfo.totalSalumi;
    // this.daysRemaining = salumeInfo.daysRemaining;
    this.salumiToNotifyArr = salumiToNotifyArr;
    this.to = user.email;
    // this.from = `Codevo ${config.get<string>("emailFrom")}`;
    this.from = "Salumi Tracker";
  }

  private newTransport() {
    // if (process.env.NODE_ENV === 'production') {
    //   console.log('Hello')
    // }

    return nodemailer.createTransport({
      // ...smtp,
      // auth: {
      //   user: smtp.user,
      //   pass: smtp.pass,
      // },
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_CLIENT_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN,
      },
    } as TransportOptions);
  }

  private async send(template: string, subject: string) {
    // Generate HTML template based on the template string
    const html = pug.renderFile(`${__dirname}/../views/${template}.pug`, {
      firstName: this.firstName,
      // salume: this.salume,
      // daysRemaining: this.daysRemaining,
      // totalSalumi: this.totalSalumi,
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
    // console.log("Email sent successfully");
    // // Send email
    const info = await this.newTransport().sendMail(mailOptions);
    console.log(info);
    // console.log(nodemailer.getTestMessageUrl(info));
  }

  async sendVerificationCode() {
    await this.send("verificationCode", "Your account verification code");
  }

  async salumeReminder() {
    // console.log("EMAIL", this.salumiToNotifyArr);
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
