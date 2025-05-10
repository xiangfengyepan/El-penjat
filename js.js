const expresiones = {
    palabra: /^[a-z]{0,10}$/,
    letra:  /^[a-z]{1}$/
}

function palabra(p) {
    var res = p.substr(0, 1),
        v = "aeiou";
        c = "qwrtypsdfghjklzxcvbnmñç";
        voc = "",
        con = "",
        pass = true, 

    n = 0;
    m = 0;
    z = 0;
    i = 0;
    while (i < p.length) {
        res = p.substr(i, 1);
        while(z < 30) {
            if(res == v.substr(z, 1)) {
                voc += res;
                m += 1;
                if(m >= 3) {
                    pass = false;
                }
                n = 0;
            } else if(res == c.substr(z, 1)){
                con += res;
                n += 1;
                if (n >= 3) {
                    pass = false;
                }
                m = 0;
            }
            z += 1;
        }
        z = 0;   
        i += 1;
    }

    if(voc =="") {
        pass = false;
    } else if (con == "") {
        pass = false;
    }
    return pass;
}

function startGame() {
    var cad = prompt('Entra una palabra.'), 
        oculto  = document.getElementById('oculto').innerHTML;
    
    if (expresiones.palabra.test(cad) && palabra(cad) == true) {
        if(cad == null){
        } else if (oculto != "") {
            alert('Dale a "reset" para volver a empezar');
        } else {
            if (cad =="") {
                alert("No lo dejes en blanco.");
            } else{
                document.getElementById('oculto').innerHTML = cad;
                i = 0;
                while(i < cad.length) {
                    document.getElementById(i).classList.remove('oculto');
                    document.getElementById(i).classList.add('input');
                    i += 1;
                }  
                
                i = 0;
                while(i <cad.length) {
                    document.getElementsByTagName('label')[i].classList.remove('oculto');
                    document.getElementsByTagName('label')[i].classList.add('label_visible');
                    i += 1;
                }

                document.getElementById('letra').classList.remove('oculto');
                document.getElementById('letra').classList.add('letra_visible');

                document.getElementById('cont').classList.remove('oculto');
                document.getElementById('cont').classList.add('cont');

                document.getElementById('reset').classList.remove('oculto');
                document.getElementById('reset').classList.add('reset_visible');

        
                document.body.classList.remove('start');
                document.body.classList.add('play');
                
                alert("La palabra es " + '"' + cad + '"' +".");

                setTimeout(() => {
                    alert('Info: Dale al botton "Letra" para introducir una letra.');
                    alert('Info: Dale al botton "Reset para volver a empezar.');
                }, 5000);
            }
        }   
    } else if( palabra(cad) == false) {
        alert('Estas seguro de que es una palabra valida, compruevalo i vulve a intentarlo.')
    } else{
        alert('Tiene que ser una palabra entre 1-10 caracteres en minusculas sin accentos i sin espacios. *Las letras "ñ, ç" no valen.');
    }

}

function letra() {
    var cad = prompt('Entra una letra.'), 
        res = document.getElementById('oculto').innerHTML,
        pass = "", 
        cont = document.getElementById('contador').textContent, 
        letras = document.getElementById('letras_restantes').textContent;
      

    if(cad == null){
    } else if(expresiones.letra.test(cad)) {
        var pass = res.substr(0, 1), 
            z = false,
            x = document.getElementById('letras_restantes').textContent;

        
        
        if(letras.indexOf(cad, 0) != -1) {
            alert('Esta letra ya la has intoducido antes.');
        } else{
            if(x == ""){
                document.getElementById('letras_restantes').textContent += cad; 
            } else {
                document.getElementById('letras_restantes').textContent += ", " + cad; 
            }

            i = 0;
            while (i < res.length) {
                
                pass = res.substr(i, 1);

                if (pass == cad ){
                    alert("La letra " + '"' + cad + '"'+ " esta en la possicion " + i + "." );
                    document.getElementById(i).value = cad;
                    
                    z = true;
                }
                i += 1;
            }
            if(z == false) {
                alert('La letra ' + '"' + cad + '"' + " no esta en esta palabra." );
            
                cont = parseInt(cont);
                cont -= 1;
                
                document.getElementById('contador').textContent = cont;
                
                if(cont <= 3) {
                    document.getElementById('cont').classList.remove('cont');
                    document.getElementById('cont').classList.add('cont-rest');
                }

                if(cont == 0) {
                    alert('Finish, se te acabaron los intentos.');
                    reset();
                }
            }
        }   
        
    } 
    else{
        alert('Tiene que ser una letra en minusculas sin accento.');  
    }
    
}

const validar = () => {
    var res,
        c = document.getElementById('contador').textContent;
       
    res = document.getElementById('oculto').innerHTML;
       
    z = 0;
    i = 0;
    x = 0;
    while ( i < res.length){

        if(expresiones.letra.test(document.getElementById(i).value) == false) {
            document.getElementById(i).value="";
        
        }
        if(document.getElementById(i).value == ""){
            document.getElementById(i).classList.add('input');
            document.getElementById(i).classList.remove('correct');
            document.getElementById(i).classList.remove('incorrect');
        } else{
            if(document.getElementById(i).value == res.substr(i, 1)){
                document.getElementById(i).classList.add('correct');
                document.getElementById(i).classList.remove('input');
                document.getElementById(i).classList.remove('incorrect');

                x += 1;

            } else{
                document.getElementById(i).classList.remove('correct');
                document.getElementById(i).classList.remove('input');
                document.getElementById(i).classList.add('incorrect');
                
                z += 1;
            }
        }
        i+= 1;

        if(x == res.length) {
            alert('Felicidades has ganado!');
            alert('Puntuacion ' + c +"/10");
            reset2();   
        }
        if(z == res.length) {
            document.getElementById('contador').textContent -= 1;
        }
        if(document.getElementById('contador').textContent == 0) {
            i = 0;
            while (i < 10 || i < res.length) {
                document.getElementById(i).value = res.substr(i, 1);
                document.getElementById(i).classList.add('incorrect');
                i += 1;
            }
            alert('Lo siento, has perdido, suerte la proxima XD ♥♥♥');
            reset2();

        }
    }
    
}

function reset() {
    var p = prompt('Estas seguro de que quieres reiniciar el juego?   ("si" o "no")');
        cad = document.getElementById('oculto').innerHTML;

    if(p == null){
    } else if(p == "si" || p == "no" || p == null || p == "") {
        if(p == "no") {
            alert('El juego continua');
        } else{
            i = 0;
            while (i < 10 || i < cad.length) {
                document.getElementById(i).value = "";

                document.getElementById(i).classList.add('input');
                document.getElementById(i).classList.remove('correct');
                document.getElementById(i).classList.remove('incorrect');
                i += 1;
            }

            document.getElementById('contador').textContent = 10;
            
            i = 0;
            while(i <cad.length) {
                document.getElementById(i).classList.remove('input');
                document.getElementById(i).classList.add('oculto');
                
                i += 1;
            }  
            i = 0;
            while(i <cad.length) {
                document.getElementsByTagName('label')[i].classList.remove('label_visible');
                document.getElementsByTagName('label')[i].classList.add('oculto');

                i += 1;
            }

            document.getElementById('letra').classList.add('oculto');
            document.getElementById('letra').classList.remove('letra_visible');

            document.getElementById('cont').classList.add('oculto');
            document.getElementById('cont').classList.remove('cont');

            document.getElementById('reset').classList.add('oculto');
            document.getElementById('reset').classList.remove('reset_visible');

            document.getElementById('oculto').innerHTML = "";

            document.getElementById('letras_restantes').innerHTML="";
           
            document.body.classList.add('start');
            document.body.classList.remove('play');

            alert('Reseteado, dale a Star game para empezar una nueva partida');
        }
    } else {
        alert('Entra ("si" o "no")')
    }
    
}

function reset2() {
    var cad = document.getElementById('oculto').innerHTML;

    i = 0;
    while (i < 10 || i < cad.length) {
        document.getElementById(i).value = "";

        document.getElementById(i).classList.add('input');
        document.getElementById(i).classList.remove('correct');
        document.getElementById(i).classList.remove('incorrect');
        i += 1;
    }

    document.getElementById('contador').textContent = 10;
    
    i = 0;
    while(i <cad.length) {
        document.getElementById(i).classList.remove('input');
        document.getElementById(i).classList.add('oculto');
        
        i += 1;
    }  
    i = 0;
    while(i <cad.length) {
        document.getElementsByTagName('label')[i].classList.remove('label_visible');
        document.getElementsByTagName('label')[i].classList.add('oculto');

        i += 1;
    }

    document.getElementById('letra').classList.add('oculto');
    document.getElementById('letra').classList.remove('letra_visible');

    document.getElementById('cont').classList.add('oculto');
    document.getElementById('cont').classList.remove('cont');

    document.getElementById('reset').classList.add('oculto');
    document.getElementById('reset').classList.remove('reset_visible');

    document.getElementById('oculto').innerHTML = "";

    document.getElementById('letras_restantes').innerHTML="";

    alert('Reseteado, dale a Star game para empezar una nueva partida');
}

function aleatorio (x, d) {
    var res = "",
        c = 0,
        res2  = 0;
        p ="abcdefghijklmnopqrtuvwxyz", 
        a = 0;;

    i = 1;
    while (i < x.length + 1) {
        res = x.substr(i-1, 1);
        z = 0;

        while (z < p.length){
            if(res == p.substr(z, 1)) {
                c += z * i;
            }
            z+= 1;
        }

        i += 1;
    }

    a = ((i ** d) * z) + d ;
    res2 = (a ** c ) % 5;
    
    return res2;
}

const inputs = document.querySelectorAll('#formulario input');

inputs.forEach((input) => {
	input.addEventListener('keyup', validar);
	input.addEventListener('blur', validar);
});