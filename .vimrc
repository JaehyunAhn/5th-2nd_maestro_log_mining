set nu
set expandtab
set hlsearch
set ai
set si
set cindent
set shiftwidth=4
set softtabstop=4
set tabstop=4
set ignorecase
set history=1000
set ruler
set title
set showmatch
set wmnu "auto make
colorscheme peachpuff
syntax on
set nocompatible

" I installed Vundle
" http://unlogic.co.uk/2013/02/08/vim-as-a-python-ide/
set rtp+=~/.vim/bundle/vundle/
call vundle#rc()

" let Vundle manage Vundle
" required!
Bundle 'gmarik/vundle'
augroup vimrc_autocmds
    autocmd!
    " highlight characters past column 120
    autocmd FileType python highlight Excess ctermbg=DarkGrey guibg=Black
    autocmd FileType python match Excess /\%120v.*/
    autocmd FileType python set nowrap
    augroup END

Bundle 'scrooloose/nerdtree'

filetype plugin indent on

" FOR HTML
set matchpairs+=<:>
set showmatch
set matchtime=3
filetype indent on
set filetype=html
set smartindent
let g:html_indent_inctags = "html,body,head,tbody,div"

set visualbell

Bundle "pangloss/vim-javascript"
" auto completion
Bundle 'davidhalter/jedi-vim'

filetype plugin indent on     " required!
