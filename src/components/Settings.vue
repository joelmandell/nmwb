<template>
    <div>
        <h3>Settings for service year:</h3>
        <div v-show="settings.length>0">
            <select v-model="year" >
                <option :value="s.year" v-for="s in settings">
                    {{ s.year }}
                </option>
            </select>

            <label>
                {{ $t("label.meetingday") }}:
                <select v-model="setting.dayMidweekMeeting">
                    <option :value="idx" v-for="(m,idx) in days">{{ m }}</option>
                </select>
            </label>
        
            <label>
                    First circuit week:
                    <select v-model="setting.circuitWeek1">
                        <option :value="m" v-for="(m,idx) in weeks">{{ m }}</option>
                    </select>
            </label>

            <label>
                    Second circuit week:
                    <select v-model="setting.circuitWeek2">
                        <option :value="m" v-for="(m,idx) in weeks">{{ m }}</option>
                    </select>
            </label>

            <label>
                    Memorial
                    <input type="date" v-model="setting.memorial" />
            </label>

            <label>
                    First circuit assembly:
                    <select v-model="setting.cAssembly1">
                        <option :value="m" v-for="(m,idx) in weeks">{{ m }}</option>
                    </select>
            </label>

            <label>
                    Second circuit assembly:
                    <select v-model="setting.cAssembly2">
                        <option :value="m" v-for="(m,idx) in weeks">{{ m }}</option>
                    </select>
            </label>

            <label>
                    Regional convention:
                    <select v-model="setting.regionalConvention">
                        <option :value="m" v-for="(m,idx) in weeks">{{ m }}</option>
                    </select>
            </label>
            <button @click="saveSettings()" class="primary button">Save</button>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
import gql from 'graphql-tag'
import {cloneDeep} from 'lodash'

export default {
    data() {
        return {
            settings: [],
            year:2017,
            days: moment.weekdays(),
            setting: {},
            weeks: moment(this.year).isoWeeksInYear(),
            client: null,
            settingsQuery: gql`
                query($year:Int!) {
                    setting(year: $year)
                    {
                        id
                        year
                        dayMidweekMeeting
                        circuitWeek1
                        circuitWeek2
                        cAssembly1
                        cAssembly2
                        regionalConvention
                        memorial
                    }
                }
            `,
        }
    },
    created: function() {
        this.client = this.$apollo.provider.defaultClient
    },
    methods: {
        saveSettings: function() {
            let self = this
            this.client.mutate({
                mutation: gql`
                    mutation ($input: SettingsInput) {
                        updateSettings(input: $input) {
                            id
                        }
                    }
                `,
                variables: {
                    input: self.setting
                },
                update: (store,{data:{updateSettings}}) => {
                    const settings = store.readQuery({query:self.settingsQuery,variables: { year : self.year }})

                    settings.setting = self.setting
                    store.writeQuery({query:self.settingsQuery,data:settings,variables:{ year: self.year }})
                }
            })
        }
    },
    apollo: {
        settings: {
            query: gql`
                query {
                    settings {
                        year
                    }
                }            
            `
        },
        setting: {
            query: gql`
                query($year:Int!) {
                    setting(year: $year)
                    {
                        id
                        year
                        dayMidweekMeeting
                        circuitWeek1
                        circuitWeek2
                        cAssembly1
                        cAssembly2
                        regionalConvention
                        memorial
                    }
                }
            `,
            result( {data}) {
                this.setting = cloneDeep(data.setting)
            },
            variables() {
                return {
                    year: this.year
                }
            }
        }
    }
}
</script>