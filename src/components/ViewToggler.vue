<template>
    <div class="flex justify-end gap-3">
        <span>View:</span>
        <div class="flex gap-3">
            <label for="grid" class="flex items-center gap-1">
                <grid class="w-3 h-3"/>
                <input 
                    class="hidden"
                    type="radio" 
                    id="grid" 
                    name="viewType" 
                    value="grid">
                <span>Grid</span>
            </label>
            
            <label for="list" class="flex items-center gap-1">
                <list class="w-3 h-3"/>
                <input 
                    class="hidden"
                    type="radio" 
                    id="list" 
                    name="viewType" 
                    value="list">
                <span>List</span>
            </label>
        </div>
    </div>
</template>
<script>
import {List, Grid} from '../util/index.js';
export default {
    components: { List, Grid },
        
}
</script>
