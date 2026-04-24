import fs from 'fs';

let inputLogin = document.getElementById("inputLoginBox");

function confirmarNickname() {
    var valorInputLogin = inputLogin.value;
    
    if ((valorInputLogin.trim().length < 5) && (valorInputLogin.trim().length > 0) && (valorInputLogin.trim() !== null) && (valorInputLogin !== undefined)) { 
        //validação JSON
        
        //lendo o arquivo
        let conteudoArquivo = fs.readFileSync("../database/users.json", "utf-8");

        //transformando em objeto
        let usuariosCarregado = JSON.parse(conteudoArquivo);

        if(usuariosCarregado.nickname === valorInputLogin){
            window.alert("login realizado com sucesso");
            console.log(usuarioCarregado.nickname + " logou com sucesso!");
        } else {
            var newUser = {
                nickname: valorInputLogin,
                score: 0,
                acertos: 0,
                erros: 0,
                dicas: 3
            }

            //escrevendo o novo usuário no JSON
            usuariosCarregado.push(newUser);
            fs.writeFileSync("../database/users.json", JSON.stringify(newUser));

            window.alert("cadastro realizado com sucesso!");
            console.log(valorInputLogin + " cadastrou com sucesso!");
        }
        
        //fechando a div do login
        var divLogin = document.querySelector(".login");
        divLogin.style.display = "none";
    } else {
        window.alert("valor inserido inválido!");
        
        //teste
        JSON.parse
    }
    //zerando o input
    inputLogin.value = "";
}