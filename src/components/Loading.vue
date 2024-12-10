<template>
  <div class="bg-gray-05 fixed flex h-screen items-center justify-center w-screen z-50">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlns:xlink="http://www.w3.org/1999/xlink"
      style="margin: auto; display: block;"
      width="100px"
      height="100px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <path
        d="M6 50A44 44 0 0 0 94 50A44 46.2 0 0 1 6 50"
        fill="#0042b4"
        stroke="none"
        transform="rotate(307.753 50 51.1)"
      >
        <animateTransform
          attributeName="transform"
          type="rotate"
          dur="0.9345794392523364s"
          repeatCount="indefinite"
          keyTimes="0;1"
          values="0 50 51.1;360 50 51.1"
        />
      </path>
    </svg>
  </div>
</template>
<script>
export default {
  name: "loading"
};
</script>