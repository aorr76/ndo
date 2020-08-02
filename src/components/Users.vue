<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="email"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>User Admin</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >New User</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedUser.email" label="Email/User ID"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedUser.name" label="Full Name"></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field v-model="editedUser.company" label="Company"></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
              <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editUser(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteUser(item)"
      >
        mdi-delete
      </v-icon>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      headers: [
        { text: 'Actions', value: 'actions', sortable: false },
        { text: 'Email/User ID', value: 'email' },
        { text: 'Name', value: 'name' },
        { text: 'Company', value: 'company' },
        { text: 'Last Login', value: 'last_login' },
        { text: 'UA', value: 'ua' },
      ],
      users: [],
      editedIndex: -1,
      editedUser: {
        email: '',
        name: '',
        company: '',
      },
      defaultUser: {
        email: '',
        name: '',
        company: '',
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'New User' : 'Edit User'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.users = [{
          "name": "Josh Gentsch",
          "email": "jgentsch0@hostgator.com",
          "company": "Jabberbean",
          "last_login": "4/11/2020",
          "ua": "Mozilla/5.0 (iPhone; U; ru; CPU iPhone OS 4_2_1 like Mac OS X; ru) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8C148a Safari/6533.18.5",
          "locked": true,
          "active": false,
          "session_age_min": 20
        }, {
          "name": "Philippine Mattack",
          "email": "pmattack1@virginia.edu",
          "company": "Realbridge",
          "last_login": "1/30/2020",
          "ua": "Mozilla/5.0 (Windows NT 6.1; WOW64; rv:31.0) Gecko/20130401 Firefox/31.0",
          "locked": true,
          "active": true,
          "session_age_min": 112
        }, {
          "name": "Maurine Quin",
          "email": "mquin2@symantec.com",
          "company": "Flashspan",
          "last_login": "1/22/2020",
          "ua": "Googlebot/2.1 (+http://www.googlebot.com/bot.html)",
          "locked": true,
          "active": true,
          "session_age_min": 97
        }, {
          "name": "Harp Bache",
          "email": "hbache3@tripadvisor.com",
          "company": "Blogpad",
          "last_login": "1/14/2020",
          "ua": "Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.724.100 Safari/534.30",
          "locked": false,
          "active": true,
          "session_age_min": 144
        }, {
          "name": "Milty Tedman",
          "email": "mtedman4@samsung.com",
          "company": "Babbleopia",
          "last_login": "7/22/2020",
          "ua": "Mozilla/5.0 (Windows; U; Windows NT 6.1; fr-FR) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",
          "locked": true,
          "active": true,
          "session_age_min": 87
        }, {
          "name": "Dulciana Mooney",
          "email": "dmooney5@jigsy.com",
          "company": "Voolia",
          "last_login": "4/10/2020",
          "ua": "Mozilla/5.0 (Windows NT 6.2; Win64; x64; rv:27.0) Gecko/20121011 Firefox/27.0",
          "locked": false,
          "active": true,
          "session_age_min": 115
        }, {
          "name": "Elias Stockoe",
          "email": "estockoe6@seesaa.net",
          "company": "Topicware",
          "last_login": "4/7/2020",
          "ua": "Mozilla/5.0 (X11; NetBSD) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.116 Safari/537.36",
          "locked": false,
          "active": false,
          "session_age_min": 111
        }, {
          "name": "Charmine Grendon",
          "email": "cgrendon7@tumblr.com",
          "company": "Gevee",
          "last_login": "1/1/2020",
          "ua": "Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko ) Version/5.1 Mobile/9B176 Safari/7534.48.3",
          "locked": true,
          "active": false,
          "session_age_min": 179
        }, {
          "name": "Garwin Mollatt",
          "email": "gmollatt8@bizjournals.com",
          "company": "Meeveo",
          "last_login": "1/28/2020",
          "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.24 Safari/535.1",
          "locked": true,
          "active": false,
          "session_age_min": 99
        }, {
          "name": "Earvin Lillico",
          "email": "elillico9@salon.com",
          "company": "Eidel",
          "last_login": "6/30/2020",
          "ua": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_8; it-it) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
          "locked": true,
          "active": false,
          "session_age_min": 112
        }, {
          "name": "Jervis Bulled",
          "email": "jbulleda@unblog.fr",
          "company": "Dynazzy",
          "last_login": "5/8/2020",
          "ua": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_6; sv-se) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",
          "locked": false,
          "active": true,
          "session_age_min": 53
        }, {
          "name": "Clementine Vassar",
          "email": "cvassarb@bloglines.com",
          "company": "Quire",
          "last_login": "2/15/2020",
          "ua": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_5_4; en-gb) AppleWebKit/528.4+ (KHTML, like Gecko) Version/4.0dp1 Safari/526.11.2",
          "locked": false,
          "active": false,
          "session_age_min": 52
        }, {
          "name": "Eustacia Madill",
          "email": "emadillc@disqus.com",
          "company": "Babbleset",
          "last_login": "6/6/2020",
          "ua": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.742.113 Safari/534.30",
          "locked": true,
          "active": true,
          "session_age_min": 68
        }, {
          "name": "Edwin Marioneau",
          "email": "emarioneaud@clickbank.net",
          "company": "Rhynoodle",
          "last_login": "5/15/2020",
          "ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.813.0 Safari/535.1",
          "locked": false,
          "active": false,
          "session_age_min": 18
        }, {
          "name": "Eran Sinisbury",
          "email": "esinisburye@upenn.edu",
          "company": "Fiveclub",
          "last_login": "3/24/2020",
          "ua": "Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/30.0.1599.17 Safari/537.36",
          "locked": true,
          "active": true,
          "session_age_min": 82
        }, {
          "name": "Perice Radeliffe",
          "email": "pradeliffef@weebly.com",
          "company": "Youtags",
          "last_login": "3/29/2020",
          "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.803.0 Safari/535.1",
          "locked": false,
          "active": true,
          "session_age_min": 43
        }, {
          "name": "Arnie O' Timony",
          "email": "aog@cnn.com",
          "company": "Topiclounge",
          "last_login": "2/22/2020",
          "ua": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.23 (KHTML, like Gecko) Chrome/11.0.686.3 Safari/534.23",
          "locked": false,
          "active": true,
          "session_age_min": 73
        }, {
          "name": "Dante Boote",
          "email": "dbooteh@multiply.com",
          "company": "DabZ",
          "last_login": "4/25/2020",
          "ua": "Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_3; el-gr) AppleWebKit/533.16 (KHTML, like Gecko) Version/5.0 Safari/533.16",
          "locked": false,
          "active": true,
          "session_age_min": 12
        }, {
          "name": "Danella Gladwin",
          "email": "dgladwini@amazon.co.uk",
          "company": "Jabbersphere",
          "last_login": "3/29/2020",
          "ua": "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.801.0 Safari/535.1",
          "locked": true,
          "active": true,
          "session_age_min": 27
        }, {
          "name": "Pat Hentze",
          "email": "phentzej@tumblr.com",
          "company": "Trilia",
          "last_login": "7/24/2020",
          "ua": "Mozilla/5.0 (Windows NT 6.0) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.220 Safari/535.1",
          "locked": true,
          "active": true,
          "session_age_min": 133
        }]
      },

      editUser (user) {
        this.editedIndex = this.users.indexOf(user)
        this.editedUser = Object.assign({}, user)
        this.dialog = true
      },

      deleteUser (user) {
        const index = this.users.indexOf(user)
        confirm('Are you sure you want to delete this user?') && this.users.splice(index, 1)
      },

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedUser = Object.assign({}, this.defaultUser)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
          Object.assign(this.users[this.editedIndex], this.editedUser)
        } else {
          this.users.push(this.editedUser)
        }
        this.close()
      },
    },
  }
</script>


