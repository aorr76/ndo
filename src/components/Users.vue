<template>
  <v-data-table
    :headers="headers"
    :items="users"
    sort-by="last_login"
    class="elevation-1"
  >
    <template v-slot:item.last_login="{ item }">
      {{ formatDate(item.last_login, "MM/DD HH:mm") }}
    </template>
    <template v-slot:item.mtime="{ item }">
      {{ formatDate(item.mtime, "MM/DD/YY HH:mm") }}
    </template>
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
                  <v-col cols="12" sm="6" md="4" v-if="isNew">
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
        { text: 'Email/User ID', value: 'email_address' },
        { text: 'Name', value: 'name' },
        { text: 'organization', value: 'organization' },
        { text: 'Idle', value: 'idle_mins' },
        { text: 'Last Login', value: 'last_login' },
        { text: 'UA', value: 'ua' },
        { text: 'Mod By', value: 'muname' },
        { text: 'Mtime', value: 'mtime' },
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
      isNew () {
        return this.editedIndex === -1
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
          "business_phone": "685-190-1220",
          "business_phone_ext": 56,
          "email_address": "jsetchell0@google.pl",
          "firstname": "Josee",
          "idle_mins": 11,
          "last_login": "2020-04-10T10:41:10Z",
          "lastname": "Setchell",
          "locked": true,
          "mtime": "2020-02-03T02:26:33Z",
          "muname": "jsetchell0@addthis.com",
          "organization": "Kertzmann, Bergnaum and Dare",
          "patron_name": "DuBuque-O'Connell",
          "salutation": "Mr",
          "ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1623.0 Safari/537.36",
          "ua_version": "1.1.8"
        }, {
          "business_phone": "737-456-4344",
          "business_phone_ext": 34,
          "email_address": "jmilsap1@mail.ru",
          "firstname": "Julee",
          "idle_mins": 97,
          "last_login": "2020-04-20T14:25:25Z",
          "lastname": "Milsap",
          "locked": true,
          "mtime": "2020-01-07T01:50:05Z",
          "muname": "jmilsap1@themeforest.net",
          "organization": "Gutkowski Group",
          "patron_name": "Heaney-Crooks",
          "salutation": "Honorable",
          "ua": "Mozilla/5.0 (Windows NT 6.1; en-US) AppleWebKit/534.30 (KHTML, like Gecko) Chrome/12.0.750.0 Safari/534.30",
          "ua_version": "1.8"
        }, {
          "business_phone": "914-484-8716",
          "business_phone_ext": 7,
          "email_address": "ribbitson2@bandcamp.com",
          "firstname": "Ramsay",
          "idle_mins": 20,
          "last_login": "2020-07-22T06:26:49Z",
          "lastname": "Ibbitson",
          "locked": false,
          "mtime": "2020-04-10T11:22:42Z",
          "muname": "ribbitson2@w3.org",
          "organization": "Veum-McKenzie",
          "patron_name": "Botsford-Heaney",
          "salutation": "Rev",
          "ua": "Mozilla/5.0 (Windows NT 5.1) AppleWebKit/535.2 (KHTML, like Gecko) Chrome/15.0.872.0 Safari/535.2",
          "ua_version": "1.48"
        }, {
          "business_phone": "295-681-9739",
          "business_phone_ext": 1,
          "email_address": "mbassano3@businessinsider.com",
          "firstname": "Magdalene",
          "idle_mins": 61,
          "last_login": "2020-01-04T10:02:33Z",
          "lastname": "Bassano",
          "locked": true,
          "mtime": "2020-02-15T16:19:03Z",
          "muname": "mbassano3@google.es",
          "organization": "Kuhlman-Hermann",
          "patron_name": "Bogan, Baumbach and Beahan",
          "salutation": "Mrs",
          "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_6_8) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.11 Safari/535.19",
          "ua_version": "8.3"
        }, {
          "business_phone": "395-856-1214",
          "business_phone_ext": 60,
          "email_address": "cfenech4@seattletimes.com",
          "firstname": "Cyndie",
          "idle_mins": 88,
          "last_login": "2020-07-23T17:37:20Z",
          "lastname": "Fenech",
          "locked": true,
          "mtime": "2020-03-31T07:19:29Z",
          "muname": "cfenech4@zimbio.com",
          "organization": "Marvin LLC",
          "patron_name": "Goldner LLC",
          "salutation": "Rev",
          "ua": "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; tr) AppleWebKit/528.4+ (KHTML, like Gecko) Version/4.0dp1 Safari/526.11.2",
          "ua_version": "6.0"
        }, {
          "business_phone": "867-364-4242",
          "business_phone_ext": 60,
          "email_address": "civantsov5@zdnet.com",
          "firstname": "Cyrille",
          "idle_mins": 25,
          "last_login": "2020-04-12T18:13:58Z",
          "lastname": "Ivantsov",
          "locked": true,
          "mtime": "2020-03-05T12:26:20Z",
          "muname": "civantsov5@aboutads.info",
          "organization": "Reichel, Stehr and Schaden",
          "patron_name": "Zieme-Reinger",
          "salutation": "Mr",
          "ua": "Mozilla/5.0 (iPad; CPU OS 5_1 like Mac OS X) AppleWebKit/534.46 (KHTML, like Gecko ) Version/5.1 Mobile/9B176 Safari/7534.48.3",
          "ua_version": "7.2.6"
        }, {
          "business_phone": "317-724-6534",
          "business_phone_ext": 55,
          "email_address": "rslatten6@timesonline.co.uk",
          "firstname": "Roxie",
          "idle_mins": 11,
          "last_login": "2020-06-04T20:33:42Z",
          "lastname": "Slatten",
          "locked": false,
          "mtime": "2020-07-31T18:03:14Z",
          "muname": "rslatten6@ed.gov",
          "organization": "Runolfsson and Sons",
          "patron_name": "Sawayn Group",
          "salutation": "Honorable",
          "ua": "Mozilla/5.0 (Macintosh; U; PPC Mac OS X 10_4_11; en) AppleWebKit/528.4+ (KHTML, like Gecko) Version/4.0dp1 Safari/526.11.2",
          "ua_version": "0.47"
        }, {
          "business_phone": "763-657-1907",
          "business_phone_ext": 38,
          "email_address": "jballingal7@un.org",
          "firstname": "Jorrie",
          "idle_mins": 75,
          "last_login": "2020-05-15T21:54:14Z",
          "lastname": "Ballingal",
          "locked": false,
          "mtime": "2020-02-11T16:35:14Z",
          "muname": "jballingal7@cdc.gov",
          "organization": "Hand LLC",
          "patron_name": "Pfeffer-Hansen",
          "salutation": "Ms",
          "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_5_8) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.801.0 Safari/535.1",
          "ua_version": "8.2.1"
        }, {
          "business_phone": "487-792-5179",
          "business_phone_ext": 55,
          "email_address": "ostenyng8@shop-pro.jp",
          "firstname": "Orren",
          "idle_mins": 2,
          "last_login": "2020-01-29T09:05:20Z",
          "lastname": "Stenyng",
          "locked": false,
          "mtime": "2020-03-04T23:56:46Z",
          "muname": "ostenyng8@hostgator.com",
          "organization": "Schimmel-Renner",
          "patron_name": "Von Inc",
          "salutation": "Dr",
          "ua": "Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:22.0) Gecko/20130328 Firefox/22.0",
          "ua_version": "7.1.0"
        }, {
          "business_phone": "396-380-2917",
          "business_phone_ext": 80,
          "email_address": "lbea9@etsy.com",
          "firstname": "Lesli",
          "idle_mins": 93,
          "last_login": "2020-07-29T11:14:12Z",
          "lastname": "Bea",
          "locked": true,
          "mtime": "2020-02-15T20:53:07Z",
          "muname": "lbea9@smugmug.com",
          "organization": "Zemlak Inc",
          "patron_name": "Kling, Nolan and Labadie",
          "salutation": "Mrs",
          "ua": "Mozilla/5.0 (Windows NT 6.0; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.36 Safari/535.7",
          "ua_version": "8.5"
        }, {
          "business_phone": "850-951-5076",
          "business_phone_ext": 54,
          "email_address": "ssollya@virginia.edu",
          "firstname": "Stanford",
          "idle_mins": 92,
          "last_login": "2020-07-03T07:06:39Z",
          "lastname": "Solly",
          "locked": true,
          "mtime": "2020-02-22T23:14:30Z",
          "muname": "ssollya@japanpost.jp",
          "organization": "Ward-Koelpin",
          "patron_name": "Metz, Walsh and Witting",
          "salutation": "Mrs",
          "ua": "Mozilla/5.0 (X11; Linux i686) AppleWebKit/534.33 (KHTML, like Gecko) Ubuntu/9.10 Chromium/13.0.752.0 Chrome/13.0.752.0 Safari/534.33",
          "ua_version": "5.10"
        }, {
          "business_phone": "300-686-4035",
          "business_phone_ext": 34,
          "email_address": "gfosterb@ftc.gov",
          "firstname": "Georges",
          "idle_mins": 80,
          "last_login": "2020-05-11T12:22:10Z",
          "lastname": "Foster",
          "locked": false,
          "mtime": "2020-07-01T19:57:45Z",
          "muname": "gfosterb@moonfruit.com",
          "organization": "Carroll-Balistreri",
          "patron_name": "Gorczany, Willms and Kreiger",
          "salutation": "Rev",
          "ua": "Mozilla/5.0 (Windows NT 5.2; WOW64) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/13.0.782.41 Safari/535.1",
          "ua_version": "7.80"
        }, {
          "business_phone": "341-283-8104",
          "business_phone_ext": 37,
          "email_address": "swardropc@statcounter.com",
          "firstname": "Saraann",
          "idle_mins": 73,
          "last_login": "2020-07-11T23:31:05Z",
          "lastname": "Wardrop",
          "locked": true,
          "mtime": "2020-02-27T04:10:42Z",
          "muname": "swardropc@jiathis.com",
          "organization": "Lockman-O'Reilly",
          "patron_name": "Langosh, Terry and Cummings",
          "salutation": "Ms",
          "ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/535.7 (KHTML, like Gecko) Chrome/16.0.912.36 Safari/535.7",
          "ua_version": "0.8.4"
        }, {
          "business_phone": "372-361-3858",
          "business_phone_ext": 30,
          "email_address": "krablind@topsy.com",
          "firstname": "Kain",
          "idle_mins": 13,
          "last_login": "2020-04-04T03:44:23Z",
          "lastname": "Rablin",
          "locked": false,
          "mtime": "2020-01-15T08:42:57Z",
          "muname": "krablind@vk.com",
          "organization": "Kiehn, Reinger and Kreiger",
          "patron_name": "Hauck Inc",
          "salutation": "Ms",
          "ua": "Mozilla/5.0 (X11; Mageia; Linux x86_64; rv:10.0.9) Gecko/20100101 Firefox/10.0.9",
          "ua_version": "0.13"
        }, {
          "business_phone": "609-729-5753",
          "business_phone_ext": 68,
          "email_address": "bcarabinee@un.org",
          "firstname": "Barrett",
          "idle_mins": 33,
          "last_login": "2020-07-03T13:42:35Z",
          "lastname": "Carabine",
          "locked": true,
          "mtime": "2020-02-14T19:27:58Z",
          "muname": "bcarabinee@flavors.me",
          "organization": "Nader, Koss and Stoltenberg",
          "patron_name": "Williamson-Krajcik",
          "salutation": "Mr",
          "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1",
          "ua_version": "6.3"
        }, {
          "business_phone": "814-175-0615",
          "business_phone_ext": 81,
          "email_address": "khelixf@marketwatch.com",
          "firstname": "Karine",
          "idle_mins": 75,
          "last_login": "2020-07-23T01:31:44Z",
          "lastname": "Helix",
          "locked": true,
          "mtime": "2020-05-04T19:44:23Z",
          "muname": "khelixf@homestead.com",
          "organization": "Fritsch LLC",
          "patron_name": "Keebler, Mayert and Murazik",
          "salutation": "Rev",
          "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_2) AppleWebKit/535.1 (KHTML, like Gecko) Chrome/14.0.835.186 Safari/535.1",
          "ua_version": "4.4.1"
        }, {
          "business_phone": "507-597-5521",
          "business_phone_ext": 12,
          "email_address": "kscneiderg@goo.gl",
          "firstname": "Katti",
          "idle_mins": 76,
          "last_login": "2020-01-02T19:21:38Z",
          "lastname": "Scneider",
          "locked": true,
          "mtime": "2020-07-09T15:05:43Z",
          "muname": "kscneiderg@xinhuanet.com",
          "organization": "Streich, Greenfelder and Gutkowski",
          "patron_name": "Miller LLC",
          "salutation": "Honorable",
          "ua": "Mozilla/5.0 (X11; CrOS i686 1660.57.0) AppleWebKit/535.19 (KHTML, like Gecko) Chrome/18.0.1025.46 Safari/535.19",
          "ua_version": "1.0"
        }, {
          "business_phone": "808-915-2605",
          "business_phone_ext": 14,
          "email_address": "rrignallh@miibeian.gov.cn",
          "firstname": "Rodolfo",
          "idle_mins": 65,
          "last_login": "2020-02-19T07:20:34Z",
          "lastname": "Rignall",
          "locked": true,
          "mtime": "2020-05-16T21:59:31Z",
          "muname": "rrignallh@tuttocitta.it",
          "organization": "Reichel-Larkin",
          "patron_name": "Schinner, Emmerich and Towne",
          "salutation": "Honorable",
          "ua": "Mozilla/5.0 (Windows; U; Windows NT 6.1; tr-TR) AppleWebKit/533.20.25 (KHTML, like Gecko) Version/5.0.4 Safari/533.20.27",
          "ua_version": "4.07"
        }, {
          "business_phone": "517-946-8563",
          "business_phone_ext": 61,
          "email_address": "eknewstubi@nature.com",
          "firstname": "Eachelle",
          "idle_mins": 71,
          "last_login": "2020-02-01T00:25:52Z",
          "lastname": "Knewstub",
          "locked": true,
          "mtime": "2020-04-02T17:43:19Z",
          "muname": "eknewstubi@ebay.co.uk",
          "organization": "Hills LLC",
          "patron_name": "Bashirian Group",
          "salutation": "Honorable",
          "ua": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/27.0.1453.93 Safari/537.36",
          "ua_version": "9.8.5"
        }, {
          "business_phone": "660-515-4723",
          "business_phone_ext": 50,
          "email_address": "cdederichj@businessinsider.com",
          "firstname": "Cherrita",
          "idle_mins": 19,
          "last_login": "2020-05-25T10:11:51Z",
          "lastname": "Dederich",
          "locked": true,
          "mtime": "2020-05-27T14:38:37Z",
          "muname": "cdederichj@wikispaces.com",
          "organization": "Rice-Hegmann",
          "patron_name": "Schaden-Bode",
          "salutation": "Mrs",
          "ua": "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.62 Safari/537.36",
          "ua_version": "0.6.1"
        }]
      },

      formatDate (value, format) {
        return this.$moment(value).format(format)
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


