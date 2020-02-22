  <template>
      <div class='wrapper'>
        <ul class='content'>
          <li>category1</li>
          <li>category2</li>
          <li>category3</li>
          <li>category4</li>
          <li>category5</li>
          <li>category6</li>
          <li>category7</li>
          <li>category8</li>
          <li>category9</li>
          <li>category10</li>
          <li>category11</li>
          <li>category12</li>
          <li>category13</li>
          <li>category14</li>
          <li>category15</li>
          <li>category16</li>
          <li>category17</li>
          <li>category18</li>
          <li>category19</li>
          <li>category20</li>
          <li>category21</li>
          <li>category22</li>
          <li>category23</li>
          <li>category24</li>
          <li>category25</li>
          <li>category26</li>
          <li>category27</li>
          <li>category28</li>
          <li>category29</li>
          <li>category30</li>
          <li>category31</li>
          <li>category32</li>
          <li>category33</li>
          <li>category34</li>
          <li>category35</li>
          <li>category36</li>
          <li>category37</li>
          <li>category38</li>
          <li>category39</li>
          <li>category40</li>
          <li>category41</li>
          <li>category42</li>
          <li>category43</li>
          <li>category44</li>
          <li>category45</li>
          <li>category46</li>
          <li>category47</li>
          <li>category48</li>
          <li>category49</li>
          <li>category50</li>
          <li>分类列表1</li>
          <li>分类列表2</li>
          <li>分类列表3</li>
          <li>分类列表4</li>
          <li>分类列表5</li>
          <li>分类列表6</li>
          <li>分类列表7</li>
          <li>分类列表8</li>
          <li>分类列表9</li>
          <li>分类列表10</li>
          <li>分类列表11</li>
          <li>分类列表12</li>
          <li>分类列表13</li>
          <li>分类列表14</li>
          <li>分类列表15</li>
          <li>分类列表16</li>
          <li>分类列表17</li>
          <li>分类列表18</li>
          <li>分类列表19</li>
          <li>分类列表20</li>
          <li>分类列表21</li>
          <li>分类列表22</li>
          <li>分类列表23</li>
          <li>分类列表24</li>
          <li>分类列表25</li>
          <li>分类列表26</li>
          <li>分类列表27</li>
          <li>分类列表28</li>
          <li>分类列表29</li>
          <li>分类列表30</li>
          <li>分类列表31</li>
          <li>分类列表32</li>
          <li>分类列表33</li>
          <li>分类列表34</li>
          <li>分类列表35</li>
          <li>分类列表36</li>
          <li>分类列表37</li>
          <li>分类列表38</li>
          <li>分类列表39</li>
          <li>分类列表40</li>
          <li>分类列表41</li>
          <li>分类列表42</li>
          <li>分类列表43</li>
          <li>分类列表44</li>
          <li>分类列表45</li>
          <li>分类列表46</li>
          <li>分类列表47</li>
          <li>分类列表48</li>
          <li>分类列表49</li>
          <li>分类列表50</li>
        </ul>
      </div>
  </template>
  <script>
  import BScroll from 'better-scroll'
  export default {
      data(){
          return {
            scroll:null
          }
      },
      created(){
        // this.$nextTick(()=>{
        //   this.scroll = new BScroll(document.querySelector('.wrapper'),{

        //   })
        // })

      },
      mounted(){
        console.log(document.querySelector('.wrapper'))
           this.scroll = new BScroll(document.querySelector('.wrapper'),{
            probeType:3,
            click:true,
            pullUpLoad:true
          })
          this.scroll.on('scroll',(position)=>{
            // console.log(position)
          })
          this.scroll.on('pullingUp',()=>{
            
          })
      }
  }
  </script>
  <style scoped>
  .wrapper {

    /* 原生实现局部滚动 */
    background:red;
    height:150px;
    /* overflow:hidden; */
    /* overflow-y: scroll; */
  }
  </style>