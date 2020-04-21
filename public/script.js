function toCurrency(price){
    return new Intl.NumberFormat('ru-RU', {
        currency: 'rub',
        style: 'currency'
    }).format(price);
}

let courses = document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
})

let $card = document.querySelector('#card');

if ($card){
    $card.addEventListener('click', e => {
        if (e.target.classList.contains('remove')){
            let id = e.target.dataset.id;
            
            fetch('/card/remove/' + id, {
                method: 'delete'

            }).then(res => 
                res.json(res)
            
            ).then(card => {
                // Проверка наличия товаров в корзине
                if (card.courses.length) {
                    const html = card.courses.map(c => {
                        return `
                            <tr>
                                <td>${c.title}</td>
                                <td>${c.count}</td>
                                <td><button data-id=${c.id} class="btn remove">Убрать</button></td>
                            </tr>
                        `
                    }).join('');
                    
                    $card.querySelector('tbody').innerHTML = html;
                    $card.querySelector('.price').innerHTML = toCurrency(card.total);

                } else $card.innerHTML = `<p>Корзина пуста</p>`;
            })
        }
    })
}