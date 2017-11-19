<template>
    <div>
        <h3>Settings for service year:</h3>
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
                <select>
                    <option :value="idx" v-for="(m,idx) in weeks">{{ m }}</option>
                </select>
        </label>

        <label>
                Second circuit week:
                <select>
                    <option :value="idx" v-for="(m,idx) in weeks">{{ m }}</option>
                </select>
        </label>

        <label>
                Memorial
                <input type="date" v-model="setting.memorial" />
        </label>

        <label>
                First circuit assembly:
                <select>
                    <option :value="idx" v-for="(m,idx) in weeks">{{ m }}</option>
                </select>
        </label>

        <label>
                Second circuit assembly:
                <select>
                    <option :value="idx" v-for="(m,idx) in weeks">{{ m }}</option>
                </select>
        </label>

        <label>
                Regional convention:
                <select>
                    <option :value="idx" v-for="(m,idx) in weeks">{{ m }}</option>
                </select>
        </label>
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
            weeks: moment(this.year).isoWeeksInYear()
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
                        dayMidweekMeeting
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