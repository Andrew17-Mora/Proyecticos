
const LS_KEY_STUDENTS = 'studentData'
const LS_KEY_LUNCHES = 'lunchData'

export const api = {
  getStudents(){
    return Promise.resolve(JSON.parse(localStorage.getItem(LS_KEY_STUDENTS)) || [])
  },
  addStudent(student){
    const arr = JSON.parse(localStorage.getItem(LS_KEY_STUDENTS)) || []
    arr.push(student)
    localStorage.setItem(LS_KEY_STUDENTS, JSON.stringify(arr))
    return Promise.resolve(student)
  },
  getLunches(){
    return Promise.resolve(JSON.parse(localStorage.getItem(LS_KEY_LUNCHES)) || [])
  },
  addLunch(lunch){
    const arr = JSON.parse(localStorage.getItem(LS_KEY_LUNCHES)) || []
    arr.push(lunch)
    localStorage.setItem(LS_KEY_LUNCHES, JSON.stringify(arr))
    return Promise.resolve(lunch)
  }
}
