const express = require('express');
const hbs = require('hbs');
const path = require('path');
const nodemailer = require("nodemailer");
const productos = require('./productos.json');
const app = express();



app.set('view engine', 'hbs');


//archivos estaticos en carpeta 'public'
app.use(express.static(path.join(__dirname, 'public')))

//codigo necesario para leer req.body o req.params
app.use(express.json());
app.use(express.urlencoded({
	extended: false
}));

//registrar parciales {{ > }}

app.use(express.static('public'))
hbs.registerPartials(__dirname + '/views/partials')

app.get('/', (req,res)=> {
	res.render('index' , {
		titulo: 'Inicio'
	});
	
})

app.get('/log-in' , (req,res)=> { //falta hacer el metodo post para el login
	res.render('log-in' , {
		titulo: 'Log In'
	});
	
	
})

app.get('/detalles-producto' , (req,res)=> {
	res.render('detalles-producto' , {
		titulo: 'Detalles del producto ',
		productos: productos
	});
	
})




app.get('/sobre-nosotros', (req,res)=> {
	res.render('sobre-nosotros' , {
		titulo: 'Sobre Nosotros'
	});
	
	
})


app.get('/como-comprar', (req,res)=> {
	res.render('como-comprar' , {
		titulo: 'Como Comprar'
	});
	
	
})

app.get('/productos', (req,res)=> {
	res.render('productos' , {
			titulo: 'Productos', 
			productos: productos
			
		})
	});
	
	


app.get('/contacto', (req,res)=> {
	res.render('contacto' , {
		titulo: 'Contacto'
	});
	
	
})

app.post('/contacto' , (req,res)=> {
var transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: ,//process.env.EMAIL_USER, 
    pass: //process.env.EMAIL_PASS 
  }
});





//usar dotenv para referenciar variables para q no esten a la vista de todos , q esas variables solo se definan en nuestra pc 
//datos sensibles 
//git ignore junto con nodemodules. node modules lo vuelvo a instalar con npm i
	
	//2.definimos el cuerpo de mail CUERPO
	console.log("BODY: " , req.body)
	let data = req.body //info recibida del formulario
	let mailOptions = {
		from: data.email, 
		to: 'probando@prueba' ,//mail al q quiero q envie esta info, que pongo usando mailtrap.io?   
		subject : data.asunto,
		text : data.comentarios
	}
	
	//3. enviamos el mail  MAIL
	transport.sendMail(mailOptions, (err, info) => {
		if(err) {
			console.log(err)
			res.status(500, err.message)
			res.status(500).render('/contacto' , {
				mensaje: `ha ocurrido el siguiente error ${err.message}`
				
			})
		}else {
			console.log('email enviado')
			res.status(200).render('contacto' , {
				mensaje : `tu email ha sido enviado correctamente`
			})
		}
		
	})
})

/*app.get('/terms' , (req,res)=> {
	res.render('terms' , {
		titulo: 'Terminos y Condiciones'
	}); //deberia ser un estatico
	
	
	
})*/





app.listen(3000, () => {
	console.log('Servidor en puerto 3000');
	
})

