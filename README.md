RedeDoar-Web
============

Rede Doar consiste em um projeto social para criação de um aplicativo Open Source que possibilita os usuários contribuírem com a sociedade compartilhando por meio de doação ou buscando doações de roupas, sobras de alimentos ou móveis. 

## Requisitos

O projeto utiliza [azk](http://www.azk.io) como plataforma de desenvolvimento, a instalação é simples e multiplataforma:

[Instalação Azk](http://docs.azk.io/pt-BR/installation/)

## Instalação

Basta clonar o projeto e iniciar o azk:

```azk start rede-doar-api```

## Atualizações

Ao baixar atualizações do projeto, é recomendado utilizar o argumento `--reprovision` para instalar possíveis novas dependências:

```azk start rede-doar-api --reprovision```

## Testes

Simples assim:

```azk start mongodb && azk shell -- npm test```

## LICENSE

MIT © [MIT](LICENSE)
