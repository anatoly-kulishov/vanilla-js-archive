import {baseInstance} from "./instances";

const tasksAPI = {
    getAllPresetTasksAndSkills: () => {
        return baseInstance.get('/presettasks').then(res => res.data)
    },
    createOnePresetTasks: (values) => {
        return baseInstance.post('/presettasks', {
            name: values.taskName,
            Skills: [
                {
                    "name": "Mock Skill 1"
                },
                {
                    "name": "Mock Skill 2"
                },
                {
                    "name": "Mock Skill 3"
                }
            ]
        })
    },
    deleteSkillFromPresetTask: (skillId) => {
        return baseInstance.delete(`/presettasks/skills/${skillId}`)
    }
}

export default tasksAPI;