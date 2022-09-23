---
title: Switching my main IDE to Neovim
description: How I configured my neovim, my choices of plugins for 2024
published: false
meta:
  - canonical:
    - en: /fr/articles/2024-01-02-je-passe-sur-neovim
---

Ca fait quelques années que j'utilise les keybindings de vim.

J'ai jamais réussi à vraiment franchir le pas de passer complètement sur vim. J'avais toujours besoin du reste de l'IDE fourni par VSCode ou Intellij.

Après avoir vu cette vidéo de [ThePrimagen](), je me suis dit, allez, je tente l'aventure... je passe sur [neovim](https://neovim.io)

Ce guide s'adresse à des personnes ayant déjà un peu pratiqué vim, ce n'est pas un tutorial, mais plutôt un journal de bord des plugins que j'installe pour en faire une nvironnement de développement confortable.

## Installation initiale

### Installer neovim sur ubuntu

Suivez le guide officiel, moi la plupart de mes postes sont sur des dérivés de debian, donc j'ai suivi l'install pour ubuntu

```bash
sudo add-apt-repository ppa:neovim-ppa/stable
sudo apt-get update
sudo apt-get install neovim
```

Et puis on prends la version unstable parce que j'aime vivre dangereusement.

Pour que neovim soit lancé à la place de vi ou vim, une petite séries d'update-alternatives:

```bash
// todo
```

### Premiers fichiers de configuration

Un des avantages de neovim c'est que la configuration se fait en lua, un language de script assez simple.  

On va créer un fichier init.lua dans le répertoire de configuration de neovim (`~/.config/nvim/init.lua`)

```lua
print('coucou');
```

En lancant neovim, on peut voir que le fichier a bien été lu et que la trace s'affiche dans notre zone de commandes:

Pour regrouper touts mes fichiers perso, je me crée un répertoire dans lequel j'initie un autre fichier init.lua. 

et celui ci importe d'autres

| nom du fichier | description |
| - | - |
| lazy.lua  | configuration de lazy.nvim, le gestionnaire de paquet, et liste des plugins   |
| set.lua | options / drapeaux d'activation des options de neovim |
| remap.lua  | toutes les configurations un peu globales de re-mappage de commandes |
| catppuccin.lua | la configuration du theme catppuccin |

Pour chaque plugin nécéssitant une configuration plus conséquente, je mettrais les

dans un répertoire `~/.config/nvim/after/plugin/`

cela permettra à chaque configuration d'être chargé une fois le plugin chargé.


### Installer un gestionnaire de plugins: [lazy.vim](https://github.com/folke/lazy.nvim)

Il suffit de suivre la doc

en gros, j'automatise le checkout du dépot git de lazy.vim

puis je charge un premier plugin, le thème [catppuccin/nvim]() : 

### Mon premier remap


### Quelques configurations sympatiques


## Conclusion

Voilà pour un premier jet, pour éviter de faire un gros pavé césar, je vais découper cette aventure en plusieurs parties.

Prochain épisode : les plugins 'cosmétiques' vitaux ( fuzzy-finder, xLine, et quelques utilitaires ( tree, bar ) )

Episode suivant, un peu plus avancé, comprendra : la coloration syntaxique, les fournisseurs de serveurs de language, les outils de debug, de tests et d'améliorations des diagnostics. ft



---

Avertissement: Cette liste de plugins est issue de mes choix complètement arbitraires, il y en a surement des mieux, sûrement des que je n'utiliserais pas. Le temps le dira.

Je suis parti pour faire ma sélection de la liste des plugins supportés par le thème [catppuccin](https://github.com/catppuccin/nvim#integrations) donc je loupe surement de bons plugins.

Pour continuer notre configuration de neovim initiée dans l'article précédent, on va installer quelques plugins incontournables. Surtout orienté sur l'expérience de navigation et la cosmétique.

## Plugins - Partie 1

### Telescope [nvim-telescope](https://github.com/nvim-telescope/telescope.nvim)

### Lualine [nvim-lualine/lualine.nvim](https://github.com/nvim-lualine/lualine.nvim)

### Which-key [folke/which-key](https://github.com/folke/which-key.nvim)

### Dashboard [nvim-dev/dashboard-nvim](https://github.com/nvimdev/dashboard-nvim)

### Vim tree [nvim-tree/nvim-tree.lua](https://github.com/nvim-tree/nvim-tree.lua)

Même si l'intérêt d'une arborescence de fichier est discutable avec un bon fuzzy-finder, j'aime bien pouvoir naviguer 


### Dropbar [Bekaboo/dropbar.nvim](https://github.com/Bekaboo/dropbar.nvim/tree/master)

Même critique à faire qu'à 


## Conclusion

// todo screenshots

---

## Plugins Partie 2

### Sneak: Naviguer visuellement [justinmk/vim-sneak](https://github.com/justinmk/vim-sneak)

à l'instar d'easymotion sur vim, sneak permets

Alternatives:
- easymotion
- leap
- hop

### treesitter : Coloration syntaxique []()


### LSP ( Language Service Provider ) [nvim-lspconfig](https://github.com/neovim/nvim-lspconfig) & [mason.nvim]()

### COC: auto-complétion [neoclide/coc.nvim](https://github.com/neoclide/coc.nvim)

### DAP ( Debug Adapter Protocol ) [nvim-dap](https://github.com/mfussenegger/nvim-dap) et [nvim-dap-ui](https://github.com/rcarriga/nvim-dap-ui)


### Neotest []()

### Symbols outline [simrat39/symbols-outline.nvim](https://github.com/simrat39/symbols-outline.nvim)



### Trouble [folke/trouble.nvim](https://github.com/folke/trouble.nvim)


## Conclusion

J'espére que cet article en trois partie vous a montré 
