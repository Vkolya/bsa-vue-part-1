window.onload = function () {
    new Vue({
        el: '#content',
        data: {
            editedUser: null,
            search: '',
            filterBy: 'name',
            columns: ['id', 'name', 'email', 'avatar', 'action'],
            users: [],
            user_fields: {id: 0, name: "", email: "", avatar: "unknown.png"},
        },
        computed: {
            userList() {

                if (this.search === '') {
                    return this.users.sort(orderByIdDesc);
                }
                return this.users.filter(user => {
                    switch (this.filterBy) {
                        case 'name':
                            return user.name.toLowerCase().includes(this.search.toLowerCase());
                            break;
                        case 'email' :
                            return user.email.toLowerCase().includes(this.search.toLowerCase());
                            break;
                    }
                })
            }
        },
        created() {
            this.getUsersViaAPI();
        },
        methods: {
            getUsersViaAPI() {
                var vue = this;
                $.ajax({
                    url: "https://jsonplaceholder.typicode.com/users",
                    method: "GET",
                    success: function (data) {

                        data.forEach(function (user) {
                            vue.users.push({
                                id: user.id,
                                name: user.name,
                                email: user.email,
                                avatar: 'img_' + user.id + '.png'
                            });
                        })
                    }
                })
            },
            add: function () {
                this.users.push({
                    id: this.users[0]['id'] + 1,
                    name: this.user_fields.name,
                    email: this.user_fields.email,
                    avatar: this.user_fields.avatar
                });
                this.users.sort(orderByIdDesc);
                $('#add').modal('hide');
            },
            remove: function (index) {
                this.users.splice(index, 1);
            },
            edit: function (user) {
                this.editedUser = user;
            },
            update: function () {
                this.editedUser = null;
            }
        }
    });
    var orderByIdDesc = function (a, b) {
        return b.id - a.id;
    };
}
