<template>
    <div>
        <router-view></router-view>
        <h3>Pupil overview</h3>

        <select @change="setPupil($event)" v-model="pupilId">
            <option :value="p.id" :key="p.id" v-for="(p) in pupils">
                {{ p.firstName}} {{ p.lastName}}
            </option>
        </select>
        <button class="primary button" @click="change()">Edit pupil</button>
        <button class="primary button" @click="add()">Add new</button>
        <h3>Tasks</h3>
        <table v-if="pupils.length>0">
            <thead>
                <th>Year</th>
                <th>Week</th>
                <th>Assignment</th>
                <th>Lesson</th>
                <th>Participant</th>
            </thead>
            <tbody>
                <tr :key="'tasks'+idx" v-for="(task,idx) in pupils[currentPupilIdx].tasks">
                    <td>{{task.year}}</td>
                    <td>{{task.week}}</td>
                    <td> 
                        <span v-if="task.taxanomies != null">
                            {{ task.taxanomies.name }}
                        </span>
                        <span v-else>
                            -
                        </span>
                    </td>
                    <td>{{task.lessonId}}</td>
                    <td>{{task.participant ? "YES" : "NO"}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import gql from 'graphql-tag'

export default {
    data() {
        return {
            pupils:[],
            pupilId:1,
            currentPupilIdx:0,
            client:null
        }
    },
    methods: {
        setPupil: function(evt) 
        {
            this.currentPupilIdx = evt.target.selectedOptions[0].index
            this.pupilId = evt.target.selectedOptions[0].value
        },
        change: function()
        {
            this.$router.push("/pupils/edit/"+this.pupilId)
        },
        add: function() {
            this.$router.push("/pupils/add")
        }
    },
    created: function() {
        this.client = this.$apollo.provider.defaultClient
    },
    apollo: {
        pupils: {
            query:gql`
            {
                pupils {
                    id
                    firstName
                    lastName
                    conducting
                    comments
                    woman
                    tasks {
                        id
		                year
                        week
                        taxanomies {
                            name
                            participant
                        }
		                taxanomyId
                        pupilId
		                lessonId
		                participant
                    }
                }  
            }`        
        }
    }
}
</script>