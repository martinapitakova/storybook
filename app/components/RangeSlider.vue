<template>
    <div class="component-wrapper">
        <div id="app">
            <div :class="'track-container ' +  (twoHandlers ? 'twoHandlers' : '' )">
                <span class="range-value min">{{ minValue}} </span> <span class="range-value max">{{ maxValue }}</span>
                <div class="track" ref="_vpcTrack"></div>
                <div class="track-highlight" ref="trackHighlight"></div>
                <button class="track-btn track1" ref="track1"></button>
                <button class="track-btn track2" ref="track2"></button>
            </div>
        </div>
    </div>
</template>




<script>
    export default {
        name: "RangeSlider",
        props: {
            twoHandlers: {
                type: Boolean,
                default: false
            }
        //     placeholder: {
        //         type: String,
        //         default: ''
        //     },
        //     prefix: {
        //         type: Boolean,
        //         default: false
        //     },
        //     suffix: {
        //         type: Boolean,
        //         default: false
        //     },
        //     textOfAddon: {
        //         type: String,
        //         default: 'text'
        //     },
        //     additionalText: {
        //         type: String
        //     },
        //     type: {
        //         type: String
        //     }
        },
        data: function() {
            return {
                min: -1,
                max: 100,
                minValue: 0,
                maxValue: 100,
                step: 1,
                totalSteps: 0,
                percentPerStep: 1,
                trackWidth: null,
                isDragging: false,
                pos: {
                    curTrack: null
                }
            }
        },
        mounted: function() {
            // calc per step value
            this.totalSteps = (this.max - this.min) / this.step;

            // percent the track button to be moved on each step
            this.percentPerStep = 100 / this.totalSteps;
            // console.log('percentPerStep', this.percentPerStep)

            // set track1 initilal
            document.querySelector('.track1').style.left = this.valueToPercent(this.minValue) + '%';
            // track2 initial position
            document.querySelector('.track2').style.left = this.valueToPercent(this.maxValue) + '%';
            // set initila track highlight
            this.setTrackHightlight();

            var self = this;

            ['mouseup', 'mousemove'].forEach( type => {
                document.body.addEventListener(type, (ev) => {
                    // ev.preventDefault();
                    if(self.isDragging && self.pos.curTrack){
                        self[type](ev, self.pos.curTrack)
                    }
                })
            });

            ['mousedown', 'mouseup', 'mousemove', 'touchstart', 'touchmove', 'touchend'].forEach( type => {
                document.querySelector('.track1').addEventListener(type, (ev) => {
                    ev.stopPropagation();
                    self[type](ev, 'track1')
                });

                document.querySelector('.track2').addEventListener(type, (ev) => {
                    ev.stopPropagation();
                    self[type](ev, 'track2')
                });
            });

            // on track clik
            // determine direction based on click proximity
            // determine percent to move based on track.clientX - click.clientX
            document.querySelector('.track').addEventListener('click', function(ev) {
                ev.stopPropagation();
                self.setClickMove(ev)

            });

            document.querySelector('.track-highlight').addEventListener('click', function(ev) {
                ev.stopPropagation();
                self.setClickMove(ev)

            });
        },
        methods: {
            moveTrack(track, ev) {

                let percentInPx = this.getPercentInPx();

                let trackX = Math.round(this.$refs._vpcTrack.getBoundingClientRect().left) ;
                let clientX = ev.clientX;
                let moveDiff = clientX - trackX;

                let moveInPct = moveDiff / percentInPx
                // console.log(moveInPct)

                if (moveInPct < 1 || moveInPct > 100) return;
                let value = (Math.round(moveInPct / this.percentPerStep) * this.step) + this.min;
                if (track === 'track1') {
                    if (value >= (this.maxValue - this.step)) return;
                    this.minValue = value;
                }

                if (track === 'track2') {

                    this.maxValue = value;
                }

                this.$refs[track].style.left = moveInPct + '%';
                this.setTrackHightlight()

            },
            mousedown(ev, track) {

                if (this.isDragging) return;
                this.isDragging = true;
                this.pos.curTrack = track;
            },

            touchstart(ev, track) {
                this.mousedown(ev, track)
            },

            mouseup(ev, track) {
                if (!this.isDragging) return;
                this.isDragging = false
            },

            touchend(ev, track) {
                this.mouseup(ev, track)
            },

            mousemove(ev, track) {
                if (!this.isDragging) return;
                this.moveTrack(track, ev)
            },

            touchmove(ev, track) {
                this.mousemove(ev.changedTouches[0], track)
            },

            valueToPercent(value) {
                return ((value - this.min) / this.step) * this.percentPerStep
            },

            setTrackHightlight() {
                if(document.querySelector('.track-container').classList.contains('twoHandlers')) {
                    this.$refs.trackHighlight.style.left = this.valueToPercent(this.minValue) + '%'
                    this.$refs.trackHighlight.style.width = (this.valueToPercent(this.maxValue) - this.valueToPercent(this.minValue)) + '%'
                }
                this.$refs.trackHighlight.style.left = this.valueToPercent(-1) + '%'
                this.$refs.trackHighlight.style.width = (this.valueToPercent(this.maxValue) - this.valueToPercent(this.minValue)) + '%'
            },

            getPercentInPx() {
                let trackWidth = this.$refs._vpcTrack.offsetWidth;
                let oneStepInPx = trackWidth / this.totalSteps;
                // 1 percent in px
                let percentInPx = oneStepInPx / this.percentPerStep;

                return percentInPx;
            },

            // setClickMove(ev) {
            //     // if(track-container ma twoHandlers ) {
            //     //     // let track1Left = this.$refs.track1.getBoundingClientRect().left;
            //     //     // let track2Left = this.$refs.track2.getBoundingClientRect().left;
            //     //     // // console.log('track1Left', track1Left)
            //     //     // if (ev.clientX < track1Left) {
            //     //     //     this.moveTrack('track1', ev)
            //     //     // } else if ((ev.clientX - track1Left) < (track2Left - ev.clientX)) {
            //     //     //     this.moveTrack('track1', ev)
            //     //     // } else {
            //     //     //     this.moveTrack('track2', ev)
            //     //     // }
            //     // }
            //     let track2Left = this.$refs.track2.getBoundingClientRect().left;
            //     // console.log('track1Left', track1Left)
            //     this.moveTrack('track2', ev)
            // }

            setClickMove(ev) {
                if(document.querySelector('.track-container').classList.contains('twoHandlers')) {
                    let track1Left = this.$refs.track1.getBoundingClientRect().left;
                    let track2Left = this.$refs.track2.getBoundingClientRect().left;
                    // console.log('track1Left', track1Left)
                    if (ev.clientX < track1Left) {
                        this.moveTrack('track1', ev)
                    } else if ((ev.clientX - track1Left) < (track2Left - ev.clientX)) {
                        this.moveTrack('track1', ev)
                    } else {
                        this.moveTrack('track2', ev)
                    }
                }
                let track2Left = this.$refs.track2.getBoundingClientRect().left;
                // console.log('track1Left', track1Left)
                this.moveTrack('track2', ev)
            }
        }
    };
</script>



<style scoped>
    body,html{
        display: flex;
        width: 100%;
        height: 100%;
        align-items: center;
        justify-content: center;
        flex-direction:column;
    }
    #app {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50%;
        flex-direction: column;
        padding-top: 30px;
    }

    .range-value{
        position: absolute;
        top: -2rem;
    }
    .range-value.min{
        left: 0;
    }

    .range-value.max{
        right: 0;
    }
    .track-container{
        width: 100%;
        position: relative;
        cursor: pointer;
        height: 0.5rem;
    }
    .track-container.twoHandlers .track1 {
        display: block;
        z-index: 2;
    }

    .track,
    .track-highlight {
        display: block;
        position: absolute;
        width: 100%;
        height: 4px;
        border-radius: 4px;
    }

    .track{
        background-color: #ddd;
    }

    .track-highlight{
        background-color: #74B9FF;
        z-index: 2;
    }

    .track-btn{
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        outline: none;
        cursor: pointer;
        display: block;
        position: absolute;
        z-index: 2;
        width: 14px;
        height: 14px;
        top: -50%;
        margin-left: -1rem;
        border: 1px solid #ECF0F1;
        background-color: whie;
        -ms-touch-action: pan-x;
        touch-action: pan-x;
        border-radius: 50%;
        transition: box-shadow .3s ease-out,background-color .3s ease,-webkit-transform .3s ease-out;
        transition: transform .3s ease-out,box-shadow .3s ease-out,background-color .3s ease;
        transition: transform .3s ease-out,box-shadow .3s ease-out,background-color .3s ease,-webkit-transform .3s ease-out;
    }
    .track1 {
        display: none;
        z-index: -1;
    }
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }
</style>