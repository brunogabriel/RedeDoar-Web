RedeDoar-Web - Instalação do módulo de documentação
============================================================

## Requisitos

Este módulo de documentação roda sobre o Python 2.7.x. Uma boa prática é isolar sua instalação, fazendo uso de recursos virtuals, tais como o virtualenv. Este módulo foi testado no Unix Like, porém o Sphinx gera um .bat para rodar sobre a arquitetura do Sistema Operacional da Microsoft.


  - python 2.7.x
  - pip
  - virtualenv (opcional)
  - Sphinx


## Instalação do Virtualenv

Para instalar o virtualenv em um sistema Unix Like:

  - sudo easy_install pip
  - sudo pip install virtualenv

Após instalação, selecione uma pasta onde seu ambiente será isolado, preferência fora do projeto, o comando base para criar sua env é: virtualenv caminho.

Dentro do item ``caminho``, dê o comando source/bin/activate, seu terminal ficará da forma:

```bash
(sphinx-fridon) brunogabriel@Brunos-MacBook-Air:~/Documents/github$
```

## Instalando os requisitos

Com sua virtualenv ativada, dentro da pasta Wiki, encontramos um arquivo chamado requirements.txt, para instalá-lo graças ao pip:

```bash
pip install -r requirements.txt
```


## Build
Para buildar o projeto Sphinx, muito simples, na raiz do projeto:

```bash
make html
```

Os arquivos serão gerados em ``build html``, a pasta ``source`` contém as configurações e código fonte do módulo, para alterar as configurações de template, só trabalhar sobre o arquivo ``conf.py``.










