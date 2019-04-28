var nodemailer = require('nodemailer');
//Generar la conexion al servidor de correo
var transporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {//se indica el usuario y contrsena
		user: 'correopruebasarchivos@gmail.com',
		pass: 'Sistemas123_'
	}
});
//envio de correo
var mailOptions ={
	from: 'correopruebasarchivos@gmail.com',
	to: 'correopruebasarchivos@gmail.com',
	subject: 'Bienvenido a Publish and shell',
	text: 'Bienvenido a Publish and shell/nPara completar tu registro ingresa aqui:'
};
//mandar el correo
transporter.sendMail(mailOptions, function(error, info)
{
	//validar error
	if(error)
	{console.log(error);
	}else
	{
	console.log('Correo enviado con exito: ' + info.response);
	}
});

		




