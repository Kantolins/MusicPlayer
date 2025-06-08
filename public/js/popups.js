  document.querySelectorAll('.delete-button').forEach(button => {
    button.addEventListener('click', function () {
      const form = this.closest('.delete-form');
      const id = form.dataset.id;

      Swal.fire({
        title: 'Supprimer ?',
        text: 'Cette reconnaissance sera définitivement supprimée.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler'
      }).then((result) => {
        if (result.isConfirmed) {
          form.submit(); // Envoie le formulaire
        }
      });
    });
  });
