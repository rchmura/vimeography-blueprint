<script>
import { mapState, mapActions } from "vuex";
import Spinner from "vue-simple-spinner";

import debounce from "lodash/debounce";

const defaultTemplate = `
  <div>
    <span :class="$style.results" :style="{visibility: this.displayingSearchResults ? 'visible' : 'hidden'}">{{totalResults}} video{{totalResults === 0 || totalResults > 1 ? "s" : ""}}</span>

    <label :class="$style.container">
      <span :class="$style.text">Search:</span>
      <input :class="$style.input" name="search" type="text" placeholder="Search videos…" v-on:input="debounceInput" />

      <div :class="$style.icon">
        <svg v-show="!this.searching" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-search"><circle cx="10.5" cy="10.5" r="7.5"></circle><line x1="21" y1="21" x2="15.8" y2="15.8"></line>
        </svg>

        <spinner size="small" v-show="this.searching"></spinner>
      </div>
    </label>
  </div>
`;

const userTemplate = document.querySelector("#vimeography-component-search");

const Search = {
  template: userTemplate ? userTemplate.innerText : defaultTemplate,
  components: {
    Spinner
  },
  methods: {
    ...mapActions(["performSearch"]),
    debounceInput: debounce(function(e) {
      this.performSearch(e.target.value);
    }, 500)
  },
  computed: mapState({
    searching: state => state.videos.loading,
    totalResults: state => state.gallery.paging.filter.total,
    displayingSearchResults: state =>
      !state.gallery.loading && state.gallery.paging.filter.query != ""
  })
};

export default Search;
</script>

<style module>
.container {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-bottom: 1rem;
  position: relative;
  width: 240px;
}

.text {
  font-weight: bold;
  margin-right: 0.5rem;
  display: none;
}

.results {
  font-size: 12px;
  font-style: italic;
  color: #373744;
  display: block;
  text-align: end;
}

input.input {
  border: 0;
  padding: 0.5rem;
  border-radius: 4px;
  width: 240px;
  border: 1px solid #e4e4e4;
  margin: 0;
  height: auto;
  font-size: 16px;
}

.icon {
  position: absolute;
  right: 8px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon svg {
  stroke: #2d3748;
}
</style>
