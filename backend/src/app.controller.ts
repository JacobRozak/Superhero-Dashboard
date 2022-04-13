import { Body, Controller, Get, Post, Res,Put, Param } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import { createReadStream, createWriteStream, writeFileSync} from 'fs';
import { join } from 'path';
const fs = require('fs')


const express = require('express')
const bodyParser = require('body-parser');
const app = express()
var cors = require('cors')
app.use(cors())
const port =  3005

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.post("/postImg",function(req,res,next){
    function jsonReader(filePath, cb) {
        fs.readFile(filePath, (err, fileData) => {
            if (err) {
                return cb && cb(err)
            }
            try {
                const object = JSON.parse(fileData)
                return cb && cb(null, object)
            } catch(err) {
                return cb && cb(err)
            }
        })
      }
      jsonReader(join(process.cwd(), 'images.json'), (err, customer) => {
        if (err) {
            console.log('Error reading file:',err)
            return
        }
        //modifying json file
        customer.push(req.body)
        fs.writeFile(join(process.cwd(), 'images.json'), JSON.stringify(customer), (err) => {
          if (err) console.log('Error writing file:', err)
        })
      })
      res.send('success')
    } );

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/register')
  async register(
    @Body('name') name: string,
    @Body('password') password: string,
  ): Promise<void> {
    return this.appService.register(name, password);
  }

  @Post('/login')
  async login(
    @Body('name') name: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    const token = await this.appService.login(name, password);

    response.cookie('token', token, { httpOnly: true });
    return token
  }

  @Post('/logout')
  async logout(
    @Res({ passthrough: true }) response: Response,
  ): Promise<string> {
    response.clearCookie('token');
    return 'Success';
  }

  @Get('/hello-world')
  helloWorld(): string {
    return 'Hello World!';
  }
  
  @Get('/images')
  getFile(@Res() res: Response) {
    const file = createReadStream(join(process.cwd(), 'images.json'));
    file.pipe(res)
  } 
  
}
