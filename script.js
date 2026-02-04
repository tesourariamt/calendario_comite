// Variáveis para controle dos modais
        let modalAberto = null;
        let timeoutFechar = null;
        
        // Função para abrir a página de impressão
        function abrirPaginaImpressao() {
            window.open('print.html', '_blank');
        }
        
        // Função para abrir o modal dos encontros de estudos
        function abrirModalEncontro(numeroEncontro, tema) {
            // Limpar qualquer timeout pendente
            if (timeoutFechar) {
                clearTimeout(timeoutFechar);
                timeoutFechar = null;
            }
            
            // Se já houver um modal aberto, fechá-lo imediatamente
            if (modalAberto) {
                var modalAnterior = document.getElementById(modalAberto);
                if (modalAnterior) {
                    modalAnterior.classList.remove('mostrar');
                    modalAnterior.style.display = 'none';
                }
            }
            
            document.getElementById('titulo-encontro').textContent = numeroEncontro + ' Encontro Grupo de Estudos Al-Anon/Alateen';
            document.getElementById('tema-encontro').textContent = tema;
            
            abrirModal('modal-encontro');
        }
        
        // Função para abrir o modal do card do mês
        function abrirModalCard(elementoTitulo, nomeMes) {
            // Limpar qualquer timeout pendente
            if (timeoutFechar) {
                clearTimeout(timeoutFechar);
                timeoutFechar = null;
            }
            
            // Se já houver um modal aberto, fechá-lo imediatamente
            if (modalAberto) {
                var modalAnterior = document.getElementById(modalAberto);
                if (modalAnterior) {
                    modalAnterior.classList.remove('mostrar');
                    modalAnterior.style.display = 'none';
                }
            }
            
            // Encontra o cartão do mês correspondente
            const cartaoMes = elementoTitulo.closest('.cartao-mes');
            
            // Define o título do modal
            document.getElementById('titulo-mes-modal').textContent = nomeMes;
            
            // Clona o conteúdo do cartão (exceto o título)
            const conteudoClone = cartaoMes.cloneNode(true);
            
            // Remove o título clonado (já temos no modal)
            const tituloClone = conteudoClone.querySelector('.titulo-mes');
            if (tituloClone) {
                tituloClone.remove();
            }
            
            // Insere o conteúdo clonado no modal
            const conteudoModal = document.getElementById('conteudo-card-mes');
            conteudoModal.innerHTML = '';
            conteudoModal.appendChild(conteudoClone);
            
            // Ajusta o estilo do cartão no modal
            conteudoClone.classList.add('cartao-mes-modal');
            
            // Reativa os eventos de clique nos subtítulos e itens clonados
            const subtitulos = conteudoClone.querySelectorAll('.subtitulo-mes.clicavel');
            subtitulos.forEach(subtitulo => {
                const onclickAttr = subtitulo.getAttribute('onclick');
                if (onclickAttr) {
                    subtitulo.onclick = function(e) {
                        e.stopPropagation();
                        eval(onclickAttr);
                    };
                }
            });
            
            // Reativa os eventos de clique nos itens especiais clonados
            const itensEspeciais = conteudoClone.querySelectorAll('.item-evento.especial');
            itensEspeciais.forEach(item => {
                const onclickAttr = item.getAttribute('onclick');
                if (onclickAttr) {
                    item.onclick = function(e) {
                        e.stopPropagation();
                        eval(onclickAttr);
                    };
                }
            });
            
            // Abre o modal
            abrirModal('modal-card-mes');
        }
        
        // Função para abrir o modal de aniversário com dados dinâmicos
        function abrirModalAniversario(nomeGrupo, dataFundacao, reunioes) {
            // Limpar qualquer timeout pendente
            if (timeoutFechar) {
                clearTimeout(timeoutFechar);
                timeoutFechar = null;
            }
            
            // Se já houver um modal aberto, fechá-lo imediatamente
            if (modalAberto) {
                var modalAnterior = document.getElementById(modalAberto);
                if (modalAnterior) {
                    modalAnterior.classList.remove('mostrar');
                    modalAnterior.style.display = 'none';
                }
            }
            
            document.getElementById('titulo-aniversario').textContent = 'Aniversário do ' + nomeGrupo;
            document.getElementById('texto-aniversario').textContent = 
                'Hoje a festa de serenidade é no ' + nomeGrupo + '. Fundado em ' + dataFundacao + ', completa mais um ano levando a mensagem de esperança para familiares e amigos de alcoólicos.';
            
            // Adicionar informações das reuniões
            var reunioesHTML = '<div class="info-reunioes"><strong>Horários de Reunião:</strong><br>' + reunioes + '</div>';
            document.getElementById('reunioes-aniversario').innerHTML = reunioesHTML;
            
            abrirModal('modal-aniversario');
        }

        // Função para abrir outros modais
        function abrirModal(idModal) {
            // Limpar qualquer timeout pendente
            if (timeoutFechar) {
                clearTimeout(timeoutFechar);
                timeoutFechar = null;
            }
            
            // Se já houver um modal aberto, fechá-lo imediatamente (sem animação)
            if (modalAberto && modalAberto !== idModal) {
                var modalAnterior = document.getElementById(modalAberto);
                if (modalAnterior) {
                    modalAnterior.classList.remove('mostrar');
                    modalAnterior.style.display = 'none';
                }
            }
            
            var modal = document.getElementById(idModal);
            if (!modal) {
                console.error('Modal não encontrado: ' + idModal);
                modalAberto = null;
                return;
            }
            
            modal.style.display = 'block';
            modalAberto = idModal;
            
            // Adicionar classe para animação de entrada
            setTimeout(function() {
                modal.classList.add('mostrar');
            }, 10);
        }

        // Função para fechar o modal
        function fecharModal(idModal) {
            // Limpar qualquer timeout pendente primeiro
            if (timeoutFechar) {
                clearTimeout(timeoutFechar);
                timeoutFechar = null;
            }
            
            var modal = document.getElementById(idModal);
            
            if (modal) {
                // Remover classe para animação de saída
                modal.classList.remove('mostrar');
                
                // Esperar a animação terminar antes de esconder
                timeoutFechar = setTimeout(function() {
                    modal.style.display = 'none';
                    // Limpar o estado global
                    if (modalAberto === idModal) {
                        modalAberto = null;
                    }
                    timeoutFechar = null;
                }, 300); // Tempo da transição
            } else {
                // Se o modal não existe, apenas limpar o estado
                modalAberto = null;
            }
        }

        // Fechar o modal se clicar fora do conteúdo
        window.onclick = function(event) {
            if (event.target.classList.contains('modal') && modalAberto) {
                fecharModal(modalAberto);
            }
        }
        
        // Fechar com tecla ESC
        document.onkeydown = function(evt) {
            evt = evt || window.event;
            if (evt.keyCode == 27 && modalAberto) {
                fecharModal(modalAberto);
            }
        };
