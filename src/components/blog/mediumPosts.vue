<template>
  <v-container class="pa-0 mb-3">
    <v-snackbar v-model="errorAlert" bottom left>
      {{ errorMsg }}
      <v-btn color="pink" flat @click="errorAlert = false">Close</v-btn>
    </v-snackbar>

    <v-layout wrap align-center justify-center row fill-height class="mt-0 mb-0">
      <v-flex xs12 md12 lg12 class="pa-2 mb-0">
        <p class="google-font mb-0" style="font-size:170%;color:#0277bd">Directory of posts</p>
        <p
          class="google-font mt-0 mb-0"
          style="font-size:110%;color:#616161 "
        >Posts are listed in reverse chronological order by date.</p>
      </v-flex>
    </v-layout>

    <v-layout wrap row>
      <v-flex xs12 v-if="showLoader">
        <v-layout row wrap>
          <v-flex xs12 sm6 md4 lg4 v-for="n in 3" :key="`4${n}`">
            <v-list two-line subheader class="pa-2">
              <v-list-tile avatar>
                <v-list-tile-avatar>
                  <v-avatar color="animate-shimmer">
                    <span class="google-font" style="width:100vh;"></span>
                  </v-avatar>
                </v-list-tile-avatar>

                <v-list-tile-content>
                  <v-list-tile-title
                    class="google-font animate-shimmer"
                    style="color:#424242;width:200px;height:20px;"
                  ></v-list-tile-title>
                  <v-list-tile-sub-title
                    class="google-font mt-1 animate-shimmer"
                    style="color:#424242;width:100px;height:20px;"
                  ></v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-icon color="grey lighten-3">info</v-icon>
                </v-list-tile-action>
              </v-list-tile>
            </v-list>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex xs12 sm6 md4 lg4 v-for="(item,i) in postsData" :key="i">
        <v-card
          flat
          class="ma-1 pa-1 my-0 elevation-0"
          style="border-radius:7px;border:1px #ddd solid"
        >
          <v-card-title class="mb-0">
            <div>
              <p class="google-font mb-2" style="font-size:140%;color:#0277bd">{{ item.title }}</p>
              <p class="google-font mt-2 mb-1">
                <span
                  v-html="$options.filters.summery(item['content:encoded'],180)"
                  style="font-size:110%"
                ></span>
              </p>
              <p class="google-font mt-1 mb-0" style="font-size:110%">
                <v-icon>insert_invitation</v-icon>
                {{ item.isoDate | dateFilter}}
              </p>
            </div>
          </v-card-title>

          <v-card-actions class="mt-0">
            <v-spacer></v-spacer>
            <v-btn
              flat
              color="#4C4A78"
              :href="item.link"
              target="_blank"
              class="mb-0 ml-0 mt-0 google-font"
              style="border-radius:7px;text-transform: capitalize;"
            >Read more</v-btn>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 v-if="notFoundPostsFlag==true">
        <p class="google-font px-2" style="font-size:140%">
          <v-icon>highlight_off</v-icon>Posts Not Found!
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import ChapterDetails from "@/assets/data/chapterDetails.json";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      chapterDetails: ChapterDetails,
      postsData: [],
      showLoader: true,
      showData: false,
      errorMsg: "",
      errorAlert: false,
      notFoundPostsFlag: false
    };
  },
  computed: {
    ...mapGetters({
      functions: "functions"
    })
  },
  created() {
    this.functions
      .httpsCallable("getPosts")()
      .then(data => data.data)
      .then(res => {
        if (res.length > 0) {
          this.showLoader = false;
          this.showData = true;
          this.postsData = res;
        } else {
          this.notFoundPostsFlag = true;
          this.showLoader = false;
        }
      })
      .catch(e => {
        this.showLoader = false;
        this.errorMsg = "Issue found with " + e;
        this.errorAlert = true;
        this.notFoundPostsFlag = true;
      });
  },
  methods: {
    getCharString(data) {
      var splitArr = data.split(" ");
      if (splitArr.length > 1) {
        return (
          splitArr[0].substring(0, 1) +
          "" +
          splitArr[1].substring(0, 1)
        ).toUpperCase();
      } else {
        return splitArr[0].substring(0, 1).toUpperCase();
      }
    }
  },
  filters: {
    summery: (val, num) => {
      return val.substring(0, num) + "..";
    },

    dateFilter: value => {
      const date = new Date(value);
      return date.toLocaleString(["en-US"], {
        month: "short",
        day: "2-digit",
        year: "numeric"
      });
    }
  }
};
</script>

<style scoped>
</style>

