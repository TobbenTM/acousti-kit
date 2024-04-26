<template>
  <div class="container">
    <h2>
      Special Sponsor
    </h2>

    <a class="sponsor" target="_blank" rel="external dofollow" title="Moonbase.sh" href="https://moonbase.sh/">
      <img alt="Special sponsor Moonbase.sh" class="dark" src="https://moonbase.sh/assets/square_transparent-white_no-text.png" width="160">
      <img alt="Special sponsor Moonbase.sh" class="light" src="https://moonbase.sh/assets/square_transparent-dark-blue_no-text.png" width="160">
      <div class="content">
        <h3>Moonbase.sh</h3>
        <p>Powering software delivery through licensing and payments, taking you from development to sales</p>
      </div>
    </a>
  </div>
</template>

<style scoped>
.light {
  display: block;
}

.dark {
  display: none;
}

:root.dark .light {
  display: none;
}

:root.dark .dark {
  display: block;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: 26px;
  font-weight: bold;
  padding: 10px 0 22px 0;
  text-align: center;
  margin: 64px auto 8px auto;
}

.sponsor {
  display: flex;
  padding: 16px;

  @media (max-width: 760px ) {
    & {
      flex-direction: column;
      align-items: center;
    }
  }

  img {
    flex-shrink: 0;
    object-fit: contain;
  }

  .content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 24px;

    @media (max-width: 760px ) {
      & {
        align-items: center;
        text-align: center;
        margin-left: 0;
      }
    }

    h3 {
      font-size: 22px;
      font-weight: medium;
    }

    p {
      margin-top: 16px;
      text-wrap: balance;
      max-width: 42ch;
    }
  }
}
</style>
