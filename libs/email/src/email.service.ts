/*
 * @Description:
 * @Author: tao.wei
 * @Date: 2021-10-08 14:31:43
 */
import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { MailerService, ISendMailOptions } from '@nestjs-modules/mailer';
import { Cache } from 'cache-manager';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailerService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async sendEmail(email: string, subject?: string, template?: string) {
    const code = Math.random().toString().slice(-6);
    const date = new Date();
    const sendMailOptions: ISendMailOptions = {
      to: email,
      subject: subject,
      template: './' + template, //这里写你的模板名称，如果你的模板名称的单名如 validate.ejs ,直接写validate即可 系统会自动追加模板的后缀名,如果是多个，那就最好写全。
      //内容部分都是自定义的
      context: {
        code, //验证码
        date, //日期
        sign: '系统邮件,回复无效。', //发送的签名,当然也可以不要
      },
    };
    try {
      await this.mailerService.sendMail(sendMailOptions);
      await this.cacheManager.set(email, code, { ttl: 1000 });
    } catch (error) {
      throw new InternalServerErrorException('获取验证码失败，请重试');
    }
  }
}
