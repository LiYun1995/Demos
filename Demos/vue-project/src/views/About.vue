<template>
    <div>
        <Carousel v-model="value1" loop>
            <CarouselItem>
                <div class="demo-carousel">1</div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">2</div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">3</div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">4</div>
            </CarouselItem>
        </Carousel>
        <h2>whats your problem</h2>
    </div>
</template>

<script>
    export default {
        name: 'about',
        data() {
            return {
                value1: 0
            }
        }
    }
</script>
