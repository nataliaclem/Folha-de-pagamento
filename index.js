const prompt = require("prompt-sync")();

const listaFuncionarios = []

function adicionarFuncionario(id, nome, cargo, taxaHoraria){
    let funcionario = {
        id: id,
        nome: nome,
        cargo: cargo,
        taxaHoraria: taxaHoraria,
        horasTrabalhadas: []
    }

    listaFuncionarios.push(funcionario)
}

function registrarHoras(idFuncionario, numHoras){
    listaFuncionarios.map((func) => {
        if(func.id == idFuncionario){
            func.horasTrabalhadas.push(numHoras)
        }
    })
}

function calcularSalarioMensal(funcionario){
    let totalHoras = 0
    funcionario.horasTrabalhadas.map(hora => {
        totalHoras += hora
    })

    return totalHoras * funcionario.taxaHoraria
}

function calcularInss(funcionario){
    let salarioBruto = calcularSalarioMensal(funcionario)
    let inss = 0

    if(salarioBruto > 4000.04){
        inss = salarioBruto * 14 / 100
    } else if (salarioBruto > 2666.69){
        inss = salarioBruto * 12 / 100
    } else if (salarioBruto > 1412.01){
        inss = salarioBruto * 9 / 100
    } else {
        inss = salarioBruto * 7.5 / 100
    }

    if(inss > 908.85){
        inss = 908.85
    }

    return inss
}

function gerarRelatorioPagamento(){
    console.log("-------- RELATÓRIO DE PAGAMENTOS ---------- \n");

    listaFuncionarios.map((func) => {

        let totalHoras = 0
        func.horasTrabalhadas.map((hora) => {
            totalHoras += hora
        })

        let salarioBruto = calcularSalarioMensal(func)
        let inss = calcularInss(func)

        console.log(`Nome: ${func.nome}`)
        console.log(`Cargo: ${func.cargo}`)
        console.log(`Total de horas trabalhadas: ${totalHoras}`)
        console.log(`Valor do INSS: R$ ${inss.toFixed(2)}`)
        console.log(`Salário bruto: R$ ${salarioBruto.toFixed(2)}`)
        console.log(`Salário líquido: R$ ${(salarioBruto - inss).toFixed(2)}`)
        console.log("---------------- \n")
    })
}

function gerenciarFolhaPagamento(){
    function exibirMenu(){
        console.log("\n--- Sistema de Folha de Pagamento ---");
        console.log("1 - Adicionar Funcionário");
        console.log("2 - Registrar Horas Trabalhadas");
        console.log("3 - Exibir Relatório de Pagamento");
        console.log("4 - Sair");
    }

    let opcao;

    do {
        exibirMenu();
        opcao = prompt("Digite a opção desejada: ");
        switch (opcao) {
            case "1":
                let id = Number(prompt("Digite o id do funcionário: "));
                let nome = prompt("Digite o nome do funcionário: ");
                let cargo = prompt("Digite o cargo do funcionário: ");
                let taxaHoraria = Number(prompt("Digite a taxa horária do funcionário: "));

                adicionarFuncionario(id, nome, cargo, taxaHoraria);
                break;

            case "2":
                let idFuncionario = Number(prompt("Digite o id do funcionário: "));
                let numHoras = Number(prompt("Digite o número de horas trabalhadas: "));

                registrarHoras(idFuncionario, numHoras);
                break;

            case "3":
                gerarRelatorioPagamento();
                break;

            case "4":
                console.log("Saindo do sistema...");
                break;

            default:
                console.log("Opção inválida!");
        }
    } while (opcao != "4");
}

gerenciarFolhaPagamento();


