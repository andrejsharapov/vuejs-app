Vue.component('site-pricing', {
    props: [ 'pricelist' ],
    template: `<div class="price-list"><template v-for="(pr, index) in pricelist" :key="index"><details><summary class="price-heading"><p class="lead">{{ pr.heading }}</p></summary><template v-for="(p, index) in pr.table" :key="index"><div class="price-table" @dblclick="$emit('select', p)"><p class="price-title">{{ p.title }}</p><p class="price-caption">{{ p.capt }}</p><p class="price-cost"><span v-if="typeof p.cost === 'number'">{{ p.cost }} ₽</span><span v-else>{{ p.cost }}</span></p></div></template></details></template></div>`,
});

Vue.component("price-selected", {
    props: [ 'p' ],
    template: `<div role="dialog"><div class="price-mask" @click="$emit('close')"></div><div class="price-full"><div class="container"><div role="button" class="price-close" @click="$emit('close')"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 212.982 212.982" width="16" height="16"><path fill="#8d8d8d" d="M131.804,106.491l75.936-75.936c6.99-6.99,6.99-18.323,0-25.312 c-6.99-6.99-18.322-6.99-25.312,0l-75.937,75.937L30.554,5.242c-6.99-6.99-18.322-6.99-25.312,0c-6.989,6.99-6.989,18.323,0,25.312 l75.937,75.936L5.242,182.427c-6.989,6.99-6.989,18.323,0,25.312c6.99,6.99,18.322,6.99,25.312,0l75.937-75.937l75.937,75.937 c6.989,6.99,18.322,6.99,25.312,0c6.99-6.99,6.99-18.322,0-25.312L131.804,106.491z"></path></svg></div><ul class="price-content flex fdc ais"><h4>{{ p.title }}</h4><p class="price-caption">{{ p.capt }}</p><div class="grid column-two"><ul><li><strong>Цена: <span v-if="typeof p.cost === 'number'">{{ p.cost }} ₽</span><span v-else>{{ p.cost }}</span></strong></li><li v-if="p.discount"><strong>Скидка: <span v-if="typeof p.discount === 'number'">{{ p.discount }} ₽</span><span v-else>{{ p.discount }}</span></strong></li></ul><template v-if="p.cms"><ul><template v-for="(value, index) in p.cms" :key="index"><li>{{ value }}</li></template></ul></template></div><template v-if="p.forWhom"><div class="for"><h4>Кому это может пригодиться?</h4><p v-html="p.forWhom"></p></div></template><template v-if="p.it"><div class="it"><h4>Включает в себя:</h4><ul class="dots"><template v-for="(value, index) in p.it" :key="index"><li>{{ value }}</li></template></ul></div></template><template v-if="p.tariff"><div class="tariffs grid column-two"><template v-for="(t, index) in p.tariff"><div class="tariff"><div class="tariff-content"><h5>{{ t.t }}</h5><p>{{ t.content }}</p></div><div class="tariff-about"><p><strong>Варианты / Правки:</strong> {{ t.vars }}</p><p><strong>Стоимость:</strong> {{ t.addcost }}</p><p><strong>Сроки реализации:</strong> {{ t.dline }}</p></div></div></template></div></template><template v-if="p.includeDev"><div class="include-dev"><h4>В разработку входит:</h4><ul class="dots"><template v-for="(value, index) in p.includeDev" :key="index"><li>{{ value }}</li></template></ul></div></template><template v-if="p.includeCost"><div class="include-cost"><h4>В стоимость входит:</h4><ul class="dots"><template v-for="(value, index) in p.includeCost" :key="index"><li>{{ value }}</li></template></ul></div></template><template v-if="typeof p.add === 'object'"><div class="add-info"><h4>Вам может пригодиться:</h4><ul class="dots"><template v-for="(value) in p.add"><li v-html="value"></li></template></ul></div></template><template v-else><div class="fullw" v-html="p.add"></div></template><template v-if="p.alert"><template v-for="(a, index) in p.alert" :key="index"><div v-html="a.text" class="alert fullw" :class="a.class">{{ a.text }}</div></template></template><div v-if="p.deadline" class="deadline fullw"><strong>Срок реализации: </strong><span v-if="p.deadline">{{ p.deadline }}</span><span v-else>не указан</span></div><template v-if="typeof p.logos === 'string'"><div class="price-logos"><h4>Клиенты</h4><p>Здесь пока пусто или клиенты не указаны умышленно...</p></div></template><template v-else><div class="price-logos"><h4>Клиенты</h4><div class="slider"><template v-for="(l, index) in p.logos" :key="index"><div class="slide-logo"><img :alt="l.alt" :src="l.src"></div></template></div></div></template></div></div></div></div>`,
});

Vue.component('site-whatisit', {
    template: `<p class="text-right"><button type="button" class="launch launch-right" @click="$emit('select')"><span class="launch-label">Подробнее</span></button></p>`,
});

Vue.component('site-whatisit-open', {
    props: ['isitopen'],
    template: `<div role="dialog"><div class="price-mask" @click="$emit('close')"></div><div class="price-full"><div class="container"><div id="whatisit"><slot v-for="(p, index) in isitopen" :key="index"><h3>{{ p.head }}</h3><p v-for="(value, index) in p.par">{{ value }}</p></slot></div>    </div></div></div>`,
});

Vue.component('site-calc', {
    props: ['pricelist'],
    data() {
      return {
        total: 0,
      }
    },
    methods: {
        calculate(event) {
            const {target: {checked, value}} = event;        
            if (checked) {
                this.total += +value;
            } else {
                this.total -= +value;
            }
        }
    },
    template: `<div><div id="calculator"><div class="cell_heading calc-cell"><span class="calc-check">Услуга</span><span class="calc-cost">Стоимость</span></div><template v-for="(i, index) in pricelist" :key="index"><div class="calc-cell" v-for="(c, index) in i.table" :key="index"><span class="calc-check"><template v-if="typeof c.cost === 'number'"><input type="checkbox" :value="c.cost" @change="calculate" :id="c.name"><label :for="c.name"><svg class="checkbox" viewbox="0 0 40 40"><defs><linearGradient id="gradient" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#3fcd85"></stop><stop offset="100%" stop-color="#21ad77"></stop></linearGradient></defs><rect x="2" y="2" width="16" height="16"></rect><rect class="colors" x="2" y="2" width="16" height="16"></rect><polyline points="6,10 9,14 14,6"></polyline></svg>{{ c.title }}</label></template><template v-else><label :for="c.name" style="cursor:help" title="Стоимость услуги обсуждается индивидуально, напрямую с Заказчиком, после составления ТЗ."><svg class="closed" fill="none" stroke="url(#gradient-closed)" viewbox="0 0 40 40"><defs><linearGradient id="gradient-closed" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#df3e7b"></stop><stop offset="100%" stop-color="#e90000"></stop></linearGradient></defs><rect x="2" y="2" width="16" height="16"></rect><line x1="6" y1="6" x2="14" y2="14"></line><line x1="14" y1="6" x2="6" y2="14"></line></svg>{{ c.title }}</label></template></span><span class="calc-cost"><template v-if="typeof c.cost === 'number'">{{ c.cost }} ₽</template><template v-else>{{ c.cost }}</template></span></div></template></div><p class="total-cost">TOTAL COST: <strong>{{ total }} ₽</strong></p></div>`
});