<template>
  <div class="status-bar"></div>
</template>
<style lang="css" scoped>
.status-bar {
  position: relative;
  width: 200px;
  height: 20px;
  background-color: #f4f4f4;
  border-radius: 10px;
  overflow: hidden;
}

.status-bar::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: linear-gradient(
    45deg,
    #dae7f9 0,
    #dae7f9 25%,
    #ebf2fc 0,
    #ebf2fc 50%,
    #dae7f9 0,
    #dae7f9 75%,
    #ebf2fc 0,
    #ebf2fc 100%
  );
  background-size: 20px 20px;
  animation: stripes 2s ease infinite;
}
@keyframes stripes {
  from {
    background-position: 0 0;
  }
  to {
    background-position: 20px 0px;
  }
}
</style>
