Vue.component('site-certificates', {
    props: ['cert'],
    template: `<div class="certs"><template v-for="(c, index) in cert" :key="index"><h3>{{ c.title }}</h3><div class="grid-certs" :class="'column-' + c.grid"><div class="card-cert" v-for="f in c.figures" :key="f.id"><div class="figure"><div class="cert-open" role="button" @click="$emit('select', f)">↗</div><picture><source media="(min-width: 62em)" :srcset="f.small"><source media="(min-width: 48em)" :srcset="f.medium"><source media="(min-width: 36em)" :srcset="f.large"><img :src="f.medium" :alt="f.caption"></picture></div><div class="text-center cert-capt"><p>{{ f.caption }}</p><p><small>{{ f.date }}</small></p></div></div></div></template></div>`,
});

Vue.component("selected-certificates", {
    props: [ 'f' ],
    template: `<div role="dialog"><div class="cert-mask" @click="$emit('close')"></div><div class="cert-full"><a :href="f.link" title="Click to open another language version." target="_blank" rel="nofollow noopener"><img :src="f.small" loading='lazy' :alt="f.caption"></a></div></div>`,
});