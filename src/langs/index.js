import Vue from 'vue'
import VueI18n from 'vue-i18n'

Vue.use(VueI18n)

const messages = {
    en: {
        message: {
            saved_automatically: 'Changes are saved automatically.'
        },
        label: {
            firstName: 'First name',
            lastName: 'Last name',
            conducting: 'Conducting',
            comments: 'Comments',
            meetingday: 'Day for midweekmeeting'
        },
        menu: {
            pupils: 'Pupils',
            settings: 'Settings'
        }
    },
    sv: {
        message: {
            saved_automatically: 'Ändringar sparas automatiskt.'
        },
        label: {
            firstName: 'Förnamn',
            lastName: 'Efternamn',
            conducting: 'Leder',
            comments: 'Kommentarer',
            meetingday: 'Dag för veckomötet'
        },
        menu: {
            pupils: 'Elever',
            settings: 'Inställningar'
        }
    }
}
  
// Create VueI18n instance with options
const i18n = new VueI18n({
    locale: 'en', // set locale
    messages, // set locale messages
})
  
export default {
    i18n
}