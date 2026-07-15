import 'dart:async';
import 'dart:convert';
import 'package:http/http.dart' as http;
import '../constants/api_constants.dart';
import 'api_exception.dart';

class ApiClient {
  final http.Client _client;

  ApiClient({http.Client? client}) : _client = client ?? http.Client();

  Future<http.Response> get(String path) {
    return _send(() => _client.get(_uri(path), headers: _headers));
  }

  Future<http.Response> patch(String path) {
    return _send(() => _client.patch(_uri(path), headers: _headers));
  }

  Map<String, String> get _headers => {'Accept': 'application/json'};

  Uri _uri(String path) => Uri.parse('${ApiConstants.baseUrl}$path');

  Future<http.Response> _send(
    Future<http.Response> Function() request,
  ) async {
    try {
      final response = await request().timeout(const Duration(seconds: 10));

      if (response.statusCode >= 200 && response.statusCode < 300) {
        return response;
      }

      throw ApiException(_errorMessage(response));
    } on ApiException {
      rethrow;
    } on TimeoutException {
      throw const ApiException('Request timed out. Please try again.');
    } on http.ClientException {
      throw const ApiException('Could not connect to the server.');
    }
  }

  String _errorMessage(http.Response response) {
    try {
      final decoded = jsonDecode(response.body);

      if (decoded is Map<String, dynamic>) {
        final message = decoded['message'];

        if (message is String && message.isNotEmpty) {
          return message;
        }
      }
    } on FormatException {
      return 'Request failed (${response.statusCode})';
    }

    return 'Request failed (${response.statusCode})';
  }
}
