from django.utils.translation import pgettext_lazy


class TaskStatus:
    STARTED = 'started'
    INITIATED = 'initiated'
    FINISHED = 'finished'
    ERROR = 'error'
    CANCELED = 'canceled'

    CHOICES = [
        (STARTED, pgettext_lazy('task status', 'Task is running')),
        (INITIATED, pgettext_lazy('task status', 'Task is initiated')),
        (FINISHED, pgettext_lazy('task status', 'Task is finished')),
        (ERROR, pgettext_lazy('task status', 'Task is raised an error')),
        (CANCELED, pgettext_lazy('task status', 'Task is canceled')),
    ]
