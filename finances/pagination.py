from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response

class SmallResultsSetPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 1000

    def get_paginated_response(self, data):

        if not self.page.has_previous():
            prev_page = None
        
        elif self.page == 1:
            prev_page = 1 
        else:
            prev_page = self.page.previous_page_number()

        if not self.page.has_next():
            next_page = None
        else:
            next_page = self.page.next_page_number()

        return Response({
            'links': {
                'next': next_page,
                'previous': prev_page
            },
            'current_page': int(self.request.query_params.get('page', 1)),
            'total': self.page.paginator.count,
            'per_page': self.page_size,
            'total_pages': round(self.page.paginator.count/self.page_size, 1),
            'data': data,
        })