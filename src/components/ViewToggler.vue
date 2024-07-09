<template>
    <div>
        <label for="grid">
            <grid/>
            <input type="radio" id="grid" name="viewType" value="grid">
            <span>Grid</span>
        </label>
        
        <label for="list">
            <list/>
            <input type="radio" id="list" name="viewType" value="list">
            <span>View</span>
        </label>
    </div>
</template>
<script>
import {List, Grid} from '../util/index.js';
export default {
    components: { List, Grid },
        
}
</script>
