export default {
    months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    formatDate(str) {
        let d = new Date(str)
        let date = `${this.months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
        return date;
    }
}